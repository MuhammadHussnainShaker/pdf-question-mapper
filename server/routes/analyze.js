import { Router } from 'express'
import multer from 'multer'
import { extractPdfData } from '../services/pdfExtractor.js'
import { detectPageNumbers } from '../services/pageNumberDetector.js'
import { detectQuestions } from '../services/questionDetector.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new ApiError(400, 'Only PDF files are accepted'), false)
    }
  },
})

/**
 * Builds the pageSummary array from page numbers and question detections.
 *
 * For each detected printed page, computes:
 * - questionStarts: question numbers that start on that page
 * - range: "min-max" string, or null if no questions, or "{min}-continue" for the last page
 *          that contains questions (when the last question has no subsequent question anywhere)
 *
 * @param {Array<number|null>} printedPageNumbers
 * @param {Map<number, number[]>} pageQuestions
 * @returns {{ printedPageSequence: Array<number|null>, pageSummary: Array }}
 */
function buildPageSummary(printedPageNumbers, pageQuestions) {
  // Find the index of the last page that has any questions
  let lastPageWithQuestions = -1
  for (let i = 0; i < printedPageNumbers.length; i++) {
    const questions = pageQuestions.get(i) || []
    if (questions.length > 0) lastPageWithQuestions = i
  }

  const printedPageSequence = printedPageNumbers.filter((n) => n !== null)

  const pageSummary = printedPageNumbers.map((printedPage, pageIndex) => {
    if (printedPage === null) return null

    const questionStarts = pageQuestions.get(pageIndex) || []

    if (questionStarts.length === 0) {
      return { printedPage, range: null, questionStarts: [] }
    }

    const minQ = Math.min(...questionStarts)
    const maxQ = Math.max(...questionStarts)

    if (questionStarts.length === 1) {
      return { printedPage, range: `${minQ}`, questionStarts }
    }

    const range = `${minQ}-${maxQ}`

    return { printedPage, range, questionStarts }
  })

  const filteredSummary = pageSummary.filter((entry) => entry !== null)

  return { printedPageSequence, pageSummary: filteredSummary }
}

router.post(
  '/',
  upload.array('files'),
  asyncHandler(async (req, res) => {
    const files = req.files

    if (!files || files.length === 0) {
      throw new ApiError(400, 'No PDF files uploaded. Use field name "files".')
    }

    const results = []

    for (const file of files) {
      const { totalPages, pages } = await extractPdfData(file.buffer)
      console.log('textContent', pages)

      const printedPageNumbers = detectPageNumbers(pages)
      const pageQuestions = detectQuestions(pages)
      const { printedPageSequence, pageSummary } = buildPageSummary(
        printedPageNumbers,
        pageQuestions,
      )

      results.push({
        fileName: file.originalname,
        totalPages,
        printedPageSequence,
        pageSummary,
      })
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { results }, 'PDFs analyzed successfully'))
  }),
)

export default router
