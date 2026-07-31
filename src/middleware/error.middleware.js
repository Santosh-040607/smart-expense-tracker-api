/**
 * Centralized error handling middleware.
 *
 * This middleware catches any errors passed using next(error)
 * and returns a consistent JSON response.
 */

function errorHandler(err, req, res, next) {
  // Log the error for debugging
  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}

module.exports = errorHandler;