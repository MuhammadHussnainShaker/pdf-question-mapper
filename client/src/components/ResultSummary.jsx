function PageDetail({ entry }) {
  const { printedPage, range, questionStarts } = entry

  if (!range) {
    return (
      <li className='text-gray-500'>
        <span className='font-medium text-gray-700'>Page {printedPage}:</span>{' '}
        No question at all
      </li>
    )
  }

  // When only one distinct question starts on this page, append "-continue" to
  // indicate the question continues beyond this page (no closing boundary visible).
  const displayRange = range.includes('-') ? range : `${range}-continue`

  return (
    <li className='text-gray-700'>
      <span className='font-medium'>Page {printedPage}:</span> Question{' '}
      {displayRange}
      {questionStarts.length > 2 ? (
        <span className='text-gray-400 text-xs ml-2'>
          ({`Q${questionStarts.join(', Q')}`})
        </span>
      ) : null}
    </li>
  )
}

function FileResult({ result }) {
  const { fileName, totalPages, printedPageSequence, pageSummary } = result

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5'>
      <h2 className='text-lg font-semibold text-gray-800 flex items-center gap-2'>
        <span>📄</span>
        <span className='break-all'>{fileName}</span>
      </h2>

      <section>
        <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2'>
          Summary
        </h3>
        <ul className='space-y-1 text-sm text-gray-700'>
          <li>
            <span className='font-medium'>Total pages:</span> {totalPages}
          </li>
          <li>
            <span className='font-medium'>Printed pages:</span>{' '}
            {printedPageSequence.length > 0
              ? printedPageSequence.join(', ')
              : '—'}
          </li>
        </ul>
      </section>

      <section>
        <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2'>
          Page Details
        </h3>
        {pageSummary.length === 0 ? (
          <p className='text-sm text-gray-400'>No page details available.</p>
        ) : (
          <ul className='space-y-1 text-sm list-disc list-inside'>
            {pageSummary.map((entry) => (
              <PageDetail key={entry.printedPage} entry={entry} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function ResultSummary({ results }) {
  if (!results || results.length === 0) return null

  return (
    <div className='space-y-6'>
      {results.map((result, i) => (
        <FileResult key={i} result={result} />
      ))}
    </div>
  )
}

export default ResultSummary
