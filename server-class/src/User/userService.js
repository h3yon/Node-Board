const userRepository = require("./userRepository");
const baseResponse = require("../../config/response/baseResponseStatus");
const { response, errResponse } = require("../../config/response");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/**
 * 회원 존재 유무 확인 후 회원가입 jwt 토큰 발급
 */
async function addUser(email, password) {
  const isExistUser = await userRepository.selectUser(email);
  if (isExistUser && isExistUser.length > 0) return errResponse(baseResponse.ALREADY_EXISTS);

  const hashedPassword = await crypto.createHash("sha512").update(password).digest("hex");
  const addResults = await userRepository.insertUser(email, hashedPassword);
  const token = await jwt.sign({ userId: addResults.insertId }, process.env.JWTSECRET, {
    expiresIn: "3d",
    subject: "userInfo",
  });
  return response(baseResponse.SUCCESS_ADD_USER, token);
}

/**
 * 회원 존재 유무 확인 후 로그인용 jwt 토큰 발급
 */
async function login(email, password) {
  const hashedPassword = await crypto.createHash("sha512").update(password).digest("hex");
  const isExistUser = await userRepository.loginRepo(email, hashedPassword);
  if (!isExistUser || isExistUser.length < 1) return errResponse(baseResponse.NO_EXISTS);

  let token = await jwt.sign({ userId: isExistUser[0].id }, process.env.JWTSECRET, {
    expiresIn: "3d",
    subject: "userInfo",
  });
  return response(baseResponse.SUCCESS_LOGIN, token);
}

module.exports = {
  addUser,
  login,
};
