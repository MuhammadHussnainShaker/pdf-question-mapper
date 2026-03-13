import { getZone } from '../utils/positionHelper.js'
import extractPageNumber from './pageNumberExtractor.js'

/**
 * Detects the printed page number for each PDF page.
 *
 * Strategy:
 * 1. Collect tokens in top/bottom zones across all pages.
 * 2. Determine the dominant zone (most pages with candidates).
 * 3. Extract numeric values from matching tokens in that zone.
 * 4. Return page numbers in exact PDF page order (null if not detected).
 *
 * @param {Array<{ pageIndex: number, width: number, height: number, items: Array<{ text: string, x: number, y: number }> }>} pages
 * @returns {Array<number|null>}
 */
function detectPageNumbers(pages) {
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

  // Determine the dominant zone (most distinct pages)
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

  // Map first found candidate per page in the dominant zone
  const pageNumberMap = {}
  for (const { pageIndex, number } of zoneCandidates[dominantZone]) {
    if (!(pageIndex in pageNumberMap)) {
      pageNumberMap[pageIndex] = number
    }
  }

  return pages.map((page) => pageNumberMap[page.pageIndex] ?? null)
}

export { detectPageNumbers }
