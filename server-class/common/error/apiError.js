const baseResponse = require("../../config/response/baseResponseStatus");
/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, code) {
    super(message);
    this.message = message;
    this.code = code;
  }
}

class APIError extends ExtendableError {
  /**
   * Creates API error.
   * @param {string} message
   * @param {number} code
   */
  constructor(message, code = 400) {
    super(message, code);
  }

  jsonReturn() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

module.exports = APIError;

/**
 * 2번째 시도
 */
// module.exports = class APIError extends Error {
//   constructor(message = "API Error") {
//     super(message);
//     this.status = 403;
//   }
// };

/**
 * 3번째
 */
// module.exports = class APIError extends Error {
//   constructor(statusCode, errors, ...args) {
//     super(...args);
//     Error.captureStackTrace(this, APIError);
//     this.statusCode = statusCode;
//     if (typeof errors === "string") {
//       this.message = errors;
//     } else {
//       this.errors = errors;
//     }
//   }
// };
