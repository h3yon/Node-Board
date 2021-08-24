const jwt = require("jsonwebtoken");
const secret_config = require("./secret");
const { errResponse } = require("./response/index");
const baseResponse = require("./response/baseResponseStatus");

const jwtMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.query.token;
  if (!token) {
    return res.send(errResponse(baseResponse.TOKEN_EMPTY));
  }
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, secret_config.jwtsecret, (err, verifiedToken) => {
      if (err) reject(err);
      resolve(verifiedToken);
    });
  });
  const onError = (error) => {
    return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
  };
  p.then((verifiedToken) => {
    req.verifiedToken = verifiedToken;
    next();
  }).catch(onError);
};

module.exports = jwtMiddleware;
