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

  getPosts = async (req, res) => {
    const { option, keyword, page } = req.query;
    let targetPage = page;

    if (isNaN(page)) return res.json(errResponse(baseResponse.CHECK_INPUT_PARAMETER));
    if (!page || page < 1) targetPage = 1;

    const postsResult = await this.postService.getPosts(option, keyword, targetPage);
    return res.send(postsResult);
  };

  addPost = async (req, res) => {
    const { userId } = req.verifiedToken;
    const { title, content } = req.body;

    if (!title || !content) return res.json(errResponse(baseResponse.VALUE_NOT_ENTERED));

    const addPostsResult = await this.postService.addPost(title, userId, content);
    return res.json(addPostsResult);
  };

  deletePost = async (req, res) => {
    const { userId } = req.verifiedToken;
    const { postId } = req.params;

    if (!postId || isNaN(postId)) return res.json(errResponse(baseResponse.CHECK_INPUT_PARAMETER));

    const deletePostResult = await this.postService.deletePost(postId, userId);
    return res.json(deletePostResult);
  };

  editPost = async (req, res) => {
    const { userId } = req.verifiedToken;
    const { postId } = req.params;
    const { title, content } = req.body;

    if (!title && !content) return res.json(errResponse(baseResponse.VALUE_NOT_ENTERED));
    if (!postId || isNaN(postId)) return res.json(errResponse(baseResponse.CHECK_INPUT_PARAMETER));

    const editPostResult = await this.postService.editPost(title, content, postId, userId);
    return res.json(editPostResult);
  };

  addComment = async (req, res) => {
    const { userId } = req.verifiedToken;
    const { postId } = req.params;
    const { content, commentId } = req.body;

    if (!content || !postId || isNaN(postId)) return res.json(errResponse(baseResponse.CHECK_INPUT_PARAMETER));

    const addCommentResult = await this.postService.addComment(content, userId, postId, commentId);
    return res.json(addCommentResult);
  };

  getComments = async (req, res) => {
    const { postId } = req.params;
    if (!postId || isNaN(postId)) return res.json(errResponse(baseResponse.CHECK_INPUT_PARAMETER));
    const getCommentsResult = await this.postService.getComments(postId);
    return res.json(getCommentsResult);
  };
}

module.exports = { PostController };
