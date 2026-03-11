import express from 'express'
import cors from 'cors'
import analyzeRouter from './routes/analyze.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/analyze-pdf', analyzeRouter)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not Found' })
})

// Global error handler
app.use(errorHandler)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`PDF Question Mapper server running on port ${PORT}`)
})

export { app }
