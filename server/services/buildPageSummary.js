/**
 * Builds the pageSummary array from page numbers and question detections.
 *
 * For each detected printed page, computes:
 * - questionStarts: question numbers that start on that page
 * - range: "min-max" string, or null if no questions
 *
 * @param {Array<number|null>} printedPageNumbers
 * @param {Map<number, number[]>} pageQuestions
 * @returns {{ printedPageSequence: Array<number|null>, pageSummary: Array }}
 */
export default function buildPageSummary(printedPageNumbers, pageQuestions) {
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
