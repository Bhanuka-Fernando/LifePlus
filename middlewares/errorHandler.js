// Centralized error handler
const errorHandler = (err, req, res, next) => {
  // Log the error stack for debugging (can be switched to a logging library in production)
  console.error(err.stack);

  // Set default status code
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Check if the error has a status code and message
  if (err.status) {
      statusCode = err.status;
      message = err.message;
  } else if (err.name === 'ValidationError') {
      statusCode = 400; // Bad Request
      message = err.message;
  } else if (err.name === 'NotFoundError') {
      statusCode = 404; // Not Found
      message = 'Resource not found';
  }

  // Respond with error details
  res.status(statusCode).json({
      error: process.env.NODE_ENV === 'production' ? message : err.message,
  });
};

module.exports = errorHandler;
