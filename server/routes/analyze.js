import { Router } from 'express'
import multer from 'multer'
import { extractPdfData } from '../services/pdfExtractor.js'
import { detectPageNumbers } from '../services/pageNumberDetector.js'
import { detectQuestions } from '../services/questionDetector.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import buildPageSummary from '../services/buildPageSummary.js'

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
