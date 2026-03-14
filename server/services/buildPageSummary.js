/**
 * Builds the pageSummary array from page numbers and question detections.
 *
 * For each detected printed page, computes:
 * - questionStarts: question numbers (as integers) that start on that page
 * - range: "min-max" string, or just "min" if one distinct question, or null if none
 *
 * @param {Array<number|null>} printedPageNumbers
 * @param {Map<number, string[]>} pageQuestions  pageIndex -> question id strings
 * @returns {{ printedPageSequence: Array<number|null>, pageSummary: Array }}
 */
export default function buildPageSummary(printedPageNumbers, pageQuestions) {
  const printedPageSequence = printedPageNumbers.filter((n) => n !== null)

  const pageSummary = printedPageNumbers.map((printedPage, pageIndex) => {
    if (printedPage === null) return null

    const rawStarts = pageQuestions.get(pageIndex) || []

    if (rawStarts.length === 0) {
      return { printedPage, range: null, questionStarts: [] }
    }

    // Convert string IDs to integers and deduplicate while preserving order
    const seen = new Set()
    const questionStarts = []
    for (const q of rawStarts) {
      const n = parseInt(q, 10)
      if (!isNaN(n) && !seen.has(n)) {
        seen.add(n)
        questionStarts.push(n)
      }
    }

    const minQ = Math.min(...questionStarts)
    const maxQ = Math.max(...questionStarts)

    const range = minQ === maxQ ? `${minQ}` : `${minQ}-${maxQ}`

    return { printedPage, range, questionStarts }
  })

  const filteredSummary = pageSummary.filter((entry) => entry !== null)

  return { printedPageSequence, pageSummary: filteredSummary }
}
