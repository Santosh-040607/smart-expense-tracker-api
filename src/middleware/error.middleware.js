/**
 * Centralized error handling middleware.
 *
 * This middleware catches any errors passed using next(error)
 * and returns a consistent JSON response.
 */

/**
 * Centralized error handling middleware.
 */
function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}

module.exports = errorHandler;

