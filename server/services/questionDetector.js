import { QUESTION_PATTERNS } from "../constants/questionNumberPatterns.js"

/**
 * Detects which questions start on each PDF page.
 *
 * - Detect question identifiers on each page using an array of focused regexes.
 * - Preserves the captured id as a string (digits only).
 * - Returns a Map: pageIndex -> array of question identifiers (strings) in appearance order.
 *
 * @param {Array<{ pageIndex: number, items: Array<{ text: string }> }>} pages
 * @returns {Map<number, string[]>} pageIndex -> questionStarts (ids as strings)
 */
function detectQuestions(pages) {
  const pageQuestions = new Map()

  for (const page of pages) {
    const { pageIndex, items } = page
    // Build page text in reading order (items already expected in extraction order).
    const fullText = items.map((it) => it.text).join(' ')

    // Collect matches from all patterns with position info so we can sort by appearance.
    const collected = []
    const seenSpans = new Set() // avoid duplicate spans from overlapping patterns

    for (const pat of QUESTION_PATTERNS) {
      // ensure independent state for global regex
      const re = new RegExp(pat.source, 'gi')
      let m
      while ((m = re.exec(fullText)) !== null) {
        const id = m[1] ? m[1].trim() : null
        if (!id) continue

        const start = m.index
        const end = re.lastIndex
        const spanKey = `${start}-${end}`
        if (seenSpans.has(spanKey)) continue
        seenSpans.add(spanKey)

        collected.push({ index: start, id, span: spanKey })
      }
    }

    // Sort matches by appearance index to preserve reading order
    collected.sort((a, b) => a.index - b.index)

    // Extract ids in order
    const questionsOnPage = collected.map((c) => c.id)

    if (questionsOnPage.length > 0) {
      pageQuestions.set(pageIndex, questionsOnPage)
    }
  }

  return pageQuestions
}

export { detectQuestions }
