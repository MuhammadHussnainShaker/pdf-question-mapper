import { PAGE_NUMBER_PATTERNS } from '../constants/pageNumberPatterns.js'

/**
 * Extracts the numeric value from a token that matches a page number pattern.
 * Returns null if the token does not match any pattern or contains no extractable number.
 * @param {string} token
 * @returns {number|null}
 */
export default function extractPageNumber(token) {
  if (!token) return null
  const trimmed = token.trim()

  for (const pattern of PAGE_NUMBER_PATTERNS) {
    if (!pattern.test(trimmed)) continue

    // Extract first sequence of Arabic digits
    const digitMatch = trimmed.match(/\d+/)
    if (digitMatch) return parseInt(digitMatch[0], 10)
  }

  return null
}