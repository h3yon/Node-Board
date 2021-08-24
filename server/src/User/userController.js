const userService = require("./userService");
const baseResponse = require("../../config/response/baseResponseStatus");
const { errResponse } = require("../../config/response");

const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,10}$/i;
// passwordRegex: 6글자 최소 하나의 문자, 숫자, 특수문자의 조합

exports.addUser = async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) return res.json(errResponse(baseResponse.VALUE_NOT_ENTERED));
  if (!emailRegex.test(email) || !passwordRegex.test(password)) return res.json(errResponse(baseResponse.CHECK_INPUT_PARAMETER));

  const addUserResult = await userService.addUser(email, password);
  return res.json(addUserResult);
};

exports.login = async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) return res.json(errResponse(baseResponse.VALUE_NOT_ENTERED));
  if (!emailRegex.test(email) || !passwordRegex.test(password)) return res.json(errResponse(baseResponse.CHECK_INPUT_PARAMETER));

  const addUserResult = await userService.login(email, password);
  return res.json(addUserResult);
};
