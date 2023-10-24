class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging (optional)
  
    // Handle specific types of errors and send appropriate responses
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  
    // Handle generic errors with a 500 status code
    res.status(500).json({ error: 'Internal server error' });
  };
  
  module.exports = { CustomError, errorHandler };