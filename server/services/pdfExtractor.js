import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs'

// Point to the bundled worker so pdfjs-dist v5 can run in Node.js
GlobalWorkerOptions.workerSrc = new URL(
  '../node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs',
  import.meta.url,
).href

/**
 * Extracts text items with positional data from a PDF buffer.
 *
 * @param {Buffer} pdfBuffer - The PDF file buffer
 * @returns {Promise<{ totalPages: number, pages: Array<{ pageIndex: number, width: number, height: number, items: Array<{ text: string, x: number, y: number }> }> }>}
 */
async function extractPdfData(pdfBuffer) {
  const uint8Array = new Uint8Array(pdfBuffer)

  const loadingTask = getDocument({
    data: uint8Array,
    disableStream: true,
    disableAutoFetch: true,
  })

  const pdfDocument = await loadingTask.promise
  const totalPages = pdfDocument.numPages
  const pages = []

  for (let i = 1; i <= totalPages; i++) {
    const page = await pdfDocument.getPage(i)
    const viewport = page.getViewport({ scale: 1 })
    const { width, height } = viewport

    const textContent = await page.getTextContent()
    const items = textContent.items
      .filter((item) => item.str && item.str.trim().length > 0)
      .map((item) => ({
        text: item.str,
        x: item.transform[4],
        y: item.transform[5],
      }))

    pages.push({ pageIndex: i - 1, width, height, items })

    page.cleanup()
  }

  return { totalPages, pages }
}

export { extractPdfData }
