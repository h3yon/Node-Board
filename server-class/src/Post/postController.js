const { PostService } = require("./postService");
const baseResponse = require("../../config/response/baseResponseStatus");
const { errResponse } = require("../../config/response/index");

class PostController {
  constructor() {
    this.postService = new PostService();
  }

  getDetailPost = async (req, res) => {
    const { postId } = req.params;

    if (!postId || isNaN(postId)) return res.json(errResponse(baseResponse.CHECK_INPUT_PARAMETER));

    const detailPostResult = await this.postService.getDetailPost(postId);
    return res.json(detailPostResult);
  };
}

module.exports = { PostController };
