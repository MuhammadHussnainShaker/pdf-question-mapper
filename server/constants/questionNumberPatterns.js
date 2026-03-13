export const QUESTION_PATTERNS = [
  // Bracketed: Question [2], Q [3]
  /\b(?:Question|Quest|Que|Qn|Q)\b\s*[:.\-–—#]*\s*\[\s*([0-9]+)\s*\]/gi,

  // Parenthesized: Q (1), Qn (3), Question (2)
  /\b(?:Question|Quest|Que|Qn|Q)\b\s*[:.\-–—#]*\s*\(\s*([0-9]+)\s*\)/gi,

  // Explicit "No:" forms: Question No: 1, Question No. 1
  /\bQuestion\b\s*(?:No\.?|No:)\s*([0-9]+)\b/gi,

  // Separated by punctuation/space: "Question - 4", "Question: 2", "Que. 3", "Quest- 10"
  /\b(?:Question|Quest|Que|Qn|Q)\b\s*(?:[:.\-–—#\s]{1,6})\s*([0-9]+)\b/gi,

  // Adjacent / abbreviated forms including "Q1", "Q.1", "Q#5", "Q-4", "q6", "Q.54"
  // Uses negative lookbehind to avoid matching inside longer words.
  /(?<!\w)(?:Q|Qn|Que)(?:[.\-#:]*)\s*([0-9]+)\b/gi,

  // Fallback: long label variants (covers "QUESTION 33", "QUESTION 1", case-insensitive)
  /\bQuestion\b\s*([0-9]+)\b/gi,
]
