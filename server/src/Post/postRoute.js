const postController = require("./postController");
const { asyncHandler } = require("../../common/handler/middlewares");
const jwtMiddleware = require("../../config/jwtMiddleware");
const { Router } = require("express");
const route = Router();

module.exports = function (app) {
  /**
   * asyncHandler 하나하나 말고 한꺼번에 통합에러처리 더 검색해보기
   */
  app.use("/api/posts", route);

  // posts
  route.get("/", asyncHandler(postController.getPosts));
  route.get("/:postId", asyncHandler(postController.getDetailPost));
  route.post("/", jwtMiddleware, asyncHandler(postController.addPost));
  route.delete("/:postId", jwtMiddleware, asyncHandler(postController.deletePost));
  route.patch("/:postId/edit", jwtMiddleware, asyncHandler(postController.editPost));

  // comments
  route.post("/:postId/comments", jwtMiddleware, asyncHandler(postController.addComment));
  route.get("/:postId/comments", asyncHandler(postController.getComments));
};