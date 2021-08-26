const jwt = require("jsonwebtoken");
const secret_config = require("../../config/secret");
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

const jwtMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.query.token;
  if (!token) return res.json(errResponse(baseResponse.TOKEN_EMPTY));

  const p = new Promise((resolve, reject) => {
    jwt.verify(token, secret_config.jwtsecret, (err, verifiedToken) => {
      if (err) reject(err);
      resolve(verifiedToken);
    });
  });
  const onError = (error) => {
    console.error(error);
    return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
  };
};

module.exports = {
  asyncHandler,
  syncHandler,
  errorHandler,
  jwtMiddleware,
};
