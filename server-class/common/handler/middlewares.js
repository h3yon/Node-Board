const { response, errResponse } = require("../../config/response");
const baseResponse = require("../../config/response/baseResponseStatus");

const syncHandler = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const errorHandler = (error, req, res, _) => {
  let code;
  if (typeof error.code === "number") code = error.code;
  return res.json({ code: code || 500, message: error.message });
};


module.exports = {
  asyncHandler,
  syncHandler,
  errorHandler,
};
