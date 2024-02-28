// We are creating our own ApiError class which is extending Error class
// Here we are overriding the constructor with statusCode, message, errors(array),stack
// This code defines a class named ApiError which extends the built-in Error class in JavaScript. 
// This custom ApiError class is designed to represent errors that occur in an API context.

class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
