import { useState, useRef } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/analyze-pdf'

function FileUpload({ setResults, setLoading, setError }) {
  const [selectedFiles, setSelectedFiles] = useState([])
  const inputRef = useRef(null)

  function handleFileChange(e) {
    setSelectedFiles(Array.from(e.target.files))
    setError(null)
    setResults(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (selectedFiles.length === 0) {
      setError('Please select at least one PDF file.')
      return
    }

    const formData = new FormData()
    for (const file of selectedFiles) {
      formData.append('files', file)
    }

    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setResults(response.data.data.results)
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Failed to analyze PDFs. Make sure the server is running.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  function handleClear() {
    setSelectedFiles([])
    setResults(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
      <h2 className='text-lg font-semibold text-gray-700 mb-4'>
        Upload PDF Files
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          ref={inputRef}
          type='file'
          multiple
          accept='.pdf'
          onChange={handleFileChange}
          className='block w-full text-sm text-gray-600
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100 cursor-pointer'
        />

        {selectedFiles.length > 0 && (
          <ul className='text-sm text-gray-500 space-y-1'>
            {selectedFiles.map((f, i) => (
              <li key={i} className='flex items-center gap-2'>
                <span className='text-blue-400'>📎</span>
                {f.name}
              </li>
            ))}
          </ul>
        )}

        <div className='flex gap-3'>
          <button
            type='submit'
            disabled={selectedFiles.length === 0}
            className='px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg
              hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            Analyze
          </button>
          {selectedFiles.length > 0 && (
            <button
              type='button'
              onClick={handleClear}
              className='px-5 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg
                hover:bg-gray-200 transition-colors'
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default FileUpload
