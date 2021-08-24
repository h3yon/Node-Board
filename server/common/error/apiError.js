const baseResponse = require("../../config/response/baseResponseStatus");
/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.code = code;
    Error.captureStackTrace(this, this.constructor.name);
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
