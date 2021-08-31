const { PostController } = require("./postController");
const { asyncHandler } = require("../../common/handler/middlewares");
const jwtMiddleware = require("../../config/jwtMiddleware");
const { Router } = require("express");
const route = Router();

const postController = new PostController();

module.exports = function (app) {
  /**
   * asyncHandler 하나하나 말고 한꺼번에 통합에러처리 더 검색해보기
   */
  app.use("/api/posts", route);

  route.get("/:postId", postController.getDetailPost);
};
