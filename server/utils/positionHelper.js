/**
 * Classify a text item into a spatial zone using relative positioning.
 *
 * PDF coordinate system: x=0 at left, y=0 at bottom.
 * We normalize to display coordinates (y=0 at top) before applying thresholds.
 *
 * Zones: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
 */

const TOP_THRESHOLD = 0.1
const BOTTOM_THRESHOLD = 0.9
const LEFT_THRESHOLD = 0.2
const RIGHT_THRESHOLD = 0.8

/**
 * Returns the zone string for a text item, or null if it is in the middle zone.
 * @param {number} x - PDF x coordinate (transform[4])
 * @param {number} y - PDF y coordinate (transform[5], 0=bottom)
 * @param {number} width - Page width
 * @param {number} height - Page height
 * @returns {string|null}
 */
function getZone(x, y, width, height) {
  const relX = x / width
  const relY = (height - y) / height // convert to display coords (0=top)

  const isTop = relY < TOP_THRESHOLD
  const isBottom = relY > BOTTOM_THRESHOLD

  if (!isTop && !isBottom) return null

  const verticalZone = isTop ? 'top' : 'bottom'

  let horizontalZone
  if (relX < LEFT_THRESHOLD) {
    horizontalZone = 'left'
  } else if (relX > RIGHT_THRESHOLD) {
    horizontalZone = 'right'
  } else {
    horizontalZone = 'center'
  }

  return `${verticalZone}-${horizontalZone}`
}

export { getZone }
