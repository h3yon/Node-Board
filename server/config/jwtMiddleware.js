const jwt = require("jsonwebtoken");
const { errResponse } = require("./response/index");
const baseResponse = require("./response/baseResponseStatus");

const jwtMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.query.token;
  if (!token) {
    return res.send(errResponse(baseResponse.TOKEN_EMPTY));
  }
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWTSECRET, (err, verifiedToken) => {
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
