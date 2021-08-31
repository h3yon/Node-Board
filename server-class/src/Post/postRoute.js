const { PostController } = require("./postController");
const { asyncHandler } = require("../../common/handler/middlewares");
// elastic -> middlewares에 들어가도 좋을 것으로 보임
// const logService = require("../../common/utils/elastic");
const jwtMiddleware = require("../../config/jwtMiddleware");
const { Router } = require("express");
const route = Router();

const postController = new PostController();

// class PostRoute {
//   router = Router();
//   constructor() {
//     this.routes();
//   }
//   routes() {
//     this.router.get("/:id", postController.getDetailPost);
//   }
// }
// module.exports = new PostRoute().router;

module.exports = function (app) {
  /**
   * asyncHandler 하나하나 말고 한꺼번에 통합에러처리 더 검색해보기
   */
  app.use("/api/posts", route);
  // app.use(
  //   // 이것도 middlewares에 넣자
  //   (req, next) => {
  //     const { method, url, header } = req;

  //     const params = {
  //       "method": method,
  //       "url": url,
  //       "header": header,
  //       "apiName": `[${method}]-${url}`,
  //     };

  //     logService.putLog(params);

  //     next();
  //   }
  // );

  // posts
  // route.get("/", asyncHandler(postController.getPosts));

  // route.get("/:postId", asyncHandler(postController.getDetailPost));
  route.get("/:postId", postController.getDetailPost);

  // route.post("/", jwtMiddleware, asyncHandler(postController.addPost));
  // route.delete("/:postId", jwtMiddleware, asyncHandler(postController.deletePost));
  // route.patch("/:postId/edit", jwtMiddleware, asyncHandler(postController.editPost));

  // // comments
  // route.post("/:postId/comments", jwtMiddleware, asyncHandler(postController.addComment));
  // route.get("/:postId/comments", asyncHandler(postController.getComments));
};
