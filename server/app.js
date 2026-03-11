import express from 'express'
import cors from 'cors'
import analyzeRouter from './routes/analyze.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
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

app.listen(PORT, () => {
  console.log(`PDF Question Mapper server running on port ${PORT}`)
})

export { app }
