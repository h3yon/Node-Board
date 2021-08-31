module.exports = function (app) {
  const userController = require("./userController");
  const { asyncHandler } = require("../../common/handler/middlewares");
  const { Router } = require("express");
  const route = Router();

  app.use("/api/users", route);
  /**
   * asyncHandler 하나하나 말고 한꺼번에 통합에러처리 더 검색해보기
   */
  route.post("/signup", asyncHandler(userController.addUser));
  route.post("/login", asyncHandler(userController.login));
};
