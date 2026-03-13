import { ApiError } from '../utils/ApiError.js'

export default function errorHandler(err, req, res, next) {
  console.error(err)

  if (res.headersSent) return next(err)

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    })
  }

  const status = err.statusCode || 500
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
}
