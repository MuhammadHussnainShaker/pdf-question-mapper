// Matches: Q1, Q.1, Q 1, Q(1), Question 1, Question.1, etc.
const QUESTION_PATTERN = /\b(?:Q(?:uestion)?\s*[.(]?\s*(\d+)[)]?)\b/gi

/**
 * Detects which questions start on each PDF page.
 *
 * Rules:
 * - Only records the first occurrence of each question number across all pages.
 * - Question numbers may jump — no inference or filling of gaps.
 * - Returns a Map: pageIndex -> sorted array of question numbers that start on that page.
 *
 * @param {Array<{ pageIndex: number, items: Array<{ text: string }> }>} pages
 * @returns {Map<number, number[]>} pageIndex -> questionStarts
 */
function detectQuestions(pages) {
  const seenQuestions = new Set()
  const pageQuestions = new Map()

  for (const page of pages) {
    const { pageIndex, items } = page
    const fullText = items.map((item) => item.text).join(' ')
    const questionsOnPage = []

    const pattern = new RegExp(QUESTION_PATTERN.source, QUESTION_PATTERN.flags)
    let match

    while ((match = pattern.exec(fullText)) !== null) {
      const questionNumber = parseInt(match[1], 10)

      if (!seenQuestions.has(questionNumber)) {
        seenQuestions.add(questionNumber)
        questionsOnPage.push(questionNumber)
      }
    }

    if (questionsOnPage.length > 0) {
      pageQuestions.set(pageIndex, questionsOnPage)
    }
  }

  return pageQuestions
}

export { detectQuestions }
