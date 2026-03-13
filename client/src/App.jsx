import { useState } from 'react'
import FileUpload from './components/FileUpload.jsx'
import ResultSummary from './components/ResultSummary.jsx'

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm'>
        <div className='max-w-4xl mx-auto px-4 py-5'>
          <h1 className='text-2xl font-bold text-gray-800'>
            📄 PDF Question Mapper
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Upload exam PDFs to analyze page numbers and question distribution
          </p>
        </div>
      </header>

      <main className='max-w-4xl mx-auto px-4 py-8 space-y-8'>
        <FileUpload
          setResults={setResults}
          setLoading={setLoading}
          setError={setError}
        />

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm'>
            {error}
          </div>
        )}

        {loading && (
          <div className='text-center py-10 text-gray-500 text-sm'>
            Analyzing PDFs…
          </div>
        )}

        {results && !loading && <ResultSummary results={results} />}
      </main>
    </div>
  )
}

export default App
