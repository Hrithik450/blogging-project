class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const ErrorMiddleware = (err, req, res, next) => {
  console.log(err);
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CastError" && err.path === "_id") {
    const message = `Resource not found with the given ID: ${err.value}`;
    err = new ErrorHandler(message, 404);
  }

  return res.status(err.statusCode).json({
    message: err.message,
  });
};

export default ErrorHandler;
