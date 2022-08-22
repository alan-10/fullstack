const handleError = (message, statusCode = 400) => {
  const error = new Error(message)
        error.statusCode = statusCode
        throw error
}

module.exports = { handleError }