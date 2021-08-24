module.exports = function (app) {
  const userController = require("./userController");
  const { asyncHandler } = require("../../common/handler/middlewares");

  /**
   * asyncHandler 하나하나 말고 한꺼번에 통합에러처리 더 검색해보기
   */
  app.post("/users/signup", asyncHandler(userController.addUser));
  app.post("/users/login", asyncHandler(userController.login));
};
