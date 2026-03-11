import { getZone } from '../utils/positionHelper.js'

// Patterns for printed page number tokens
const PAGE_NUMBER_PATTERNS = [
  /^\d+$/, // plain number: 1, 42
  /^page\s*\d+$/i, // page prefix: Page 1, page42
  /^\(\d+\)$/, // parenthesized: (1)
  /^-\s*\d+\s*-$/, // dashed: - 1 -
]

/**
 * Extracts the numeric value from a token that matches a page number pattern.
 * Returns null if the token does not match any pattern.
 * @param {string} token
 * @returns {number|null}
 */
function extractPageNumber(token) {
  const trimmed = token.trim()

  for (const pattern of PAGE_NUMBER_PATTERNS) {
    if (pattern.test(trimmed)) {
      const digits = trimmed.match(/\d+/)
      if (digits) return parseInt(digits[0], 10)
    }
  }

  return null
}

/**
 * Detects the printed page number for each PDF page.
 *
 * Strategy:
 * 1. Collect all text items in top/bottom zones across all pages.
 * 2. Determine which zone is consistently used for page numbers.
 * 3. Extract numeric values from matching tokens in that zone.
 * 4. Return page numbers in exact PDF page order (null if not detected).
 *
 * @param {Array<{ pageIndex: number, width: number, height: number, items: Array<{ text: string, x: number, y: number }> }>} pages
 * @returns {Array<number|null>}
 */
function detectPageNumbers(pages) {
  // Map: zone -> array of { pageIndex, number } candidates
  const zoneCandidates = {}

  for (const page of pages) {
    const { pageIndex, width, height, items } = page

    for (const item of items) {
      const zone = getZone(item.x, item.y, width, height)
      if (!zone) continue

      const num = extractPageNumber(item.text)
      if (num === null) continue

      if (!zoneCandidates[zone]) zoneCandidates[zone] = []
      zoneCandidates[zone].push({ pageIndex, number: num })
    }
  }

  // Determine the dominant zone: the one with candidates on the most distinct pages
  const zonePageCounts = {}
  for (const [zone, candidates] of Object.entries(zoneCandidates)) {
    const distinctPages = new Set(candidates.map((c) => c.pageIndex))
    zonePageCounts[zone] = distinctPages.size
  }

  const dominantZone = Object.entries(zonePageCounts).sort(
    ([, a], [, b]) => b - a,
  )[0]?.[0]

  if (!dominantZone) {
    return pages.map(() => null)
  }

  // Build a map: pageIndex -> printed page number (take the first match per page)
  const pageNumberMap = {}
  for (const { pageIndex, number } of zoneCandidates[dominantZone]) {
    if (!(pageIndex in pageNumberMap)) {
      pageNumberMap[pageIndex] = number
    }
  }

  // Return in exact PDF page order
  return pages.map((page) => pageNumberMap[page.pageIndex] ?? null)
}

export { detectPageNumbers }
