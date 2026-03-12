// Matches: Q1, Q.1, Q 1, Q(1), Question 1, Question.1, etc.
const QUESTION_PATTERN = /\b(?:Q(?:uestion)?\s*[.(]?\s*(\d+)[)]?)\b/gi

/**
 * Detects which questions start on each PDF page.
 *
 * Rules:
 * - Question numbers may jump — no inference or filling of gaps.
 * - Returns a Map: pageIndex -> array of question identifiers (strings) in their appearance order.
 *
 * @param {Array<{ pageIndex: number, items: Array<{ text: string }> }>} pages
 * @returns {Map<number, string[]>} pageIndex -> questionStarts (ids as strings)
 */
function detectQuestions(pages) {
  const pageQuestions = new Map()

  for (const page of pages) {
    const { pageIndex, items } = page
    const fullText = items.map((item) => item.text).join(' ')
    const questionsOnPage = []

    const pattern = new RegExp(QUESTION_PATTERN.source, QUESTION_PATTERN.flags)
    let match

    while ((match = pattern.exec(fullText)) !== null) {
      const questionId = match[1] ? match[1].trim() : null
      if (questionId) {
        questionsOnPage.push(questionId)
      }
    }

    if (questionsOnPage.length > 0) {
      pageQuestions.set(pageIndex, questionsOnPage)
    }
  }

  return pageQuestions
}

export { detectQuestions }
