// errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = err.status || 500; // Default to Internal Server Error (500) if no status code is set
    const errorMessage = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({ error: errorMessage });
  };
  
  module.exports = errorHandler;
  