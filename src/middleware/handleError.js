import HttpStatus from 'http-status-codes';

/**
  *@description Middleware function that handles errors
  *@param  {} void
  *@returns {object} - error response
  */
// eslint-disable-next-line no-unused-vars
const handleError = () => (err, req, res, next) => {
  const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;

  return res.status(status).json({
    error: {
      code: status,
      type: err.constructor.name || 'Server error',
      message: err.message,
    },
  });
};

export default handleError;
