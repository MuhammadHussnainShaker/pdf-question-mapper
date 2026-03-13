/**
 * List of page-number patterns commonly encountered in academic PDFs.
 */
export const PAGE_NUMBER_PATTERNS = [
  // Plain Arabic numbers: "1", "42"
  /^\d+$/,

  // With "page" / "pg" / "p" prefixes and optional punctuation: "Page 1", "p.1", "pg: 10"
  /^(?:page|pg|p\.?|pp\.?)\s*[:.\-–—#]?\s*\d+$/i,

  // Parenthesized or bracketed: "(1)", "[1]", "( page 5 )"
  /^\(\s*\d+\s*\)$/,
  /^\[\s*\d+\s*\]$/,

  // Dashed/bordered variants: "- 1 -", "— 2 —"
  /^[-–—]\s*\d+\s*[-–—]$/,

  // With hash/numero symbols: "#5", "№ 3"
  /^[#№]\s*\d+$/,

  // Page ranges (may appear, pick first number): "1-2", "p. 5-6"
  /^(?:page|pg|p\.?)?\s*\d+\s*[-–—]\s*\d+$/i,

  // Parenthesized prefix: "(page 5)"
  /^\(\s*(?:page|pg|p\.?)\s*\d+\s*\)$/i,

  // Abbreviated forms: "p1", "page1"
  /^(?:p|page|pg)\s*\d+$/i,
]
