const postService = require("./postService");
const baseResponse = require("../../config/response/baseResponseStatus");
const { errResponse } = require("../../config/response/index");

exports.getPosts = async function (req, res) {
  const { option, keyword, page } = req.query;
  let targetPage = page;

  if (isNaN(page)) return res.json(errResponse(baseResponse.CHECK_INPUT_PARAMETER));
  if (!page || page < 1) targetPage = 1;

  const postsResult = await postService.getPosts(option, keyword, targetPage);
  return res.send(postsResult);
};

exports.addPost = async function (req, res) {
  const { userId } = req.verifiedToken;
  const { title, content } = req.body;

  if (!title || !content) return res.json(errResponse(baseResponse.VALUE_NOT_ENTERED));

  const addPostsResult = await postService.addPost(title, userId, content);
  return res.json(addPostsResult);
};

exports.getDetailPost = async function (req, res) {
  const { postId } = req.params;

  if (!postId || isNaN(postId)) return res.json(errResponse(baseResponse.CHECK_INPUT_PARAMETER));

  const detailPostResult = await postService.getDetailPost(postId);
  return res.json(detailPostResult);
};

exports.deletePost = async function (req, res) {
  const { userId } = req.verifiedToken;
  const { postId } = req.params;

  if (!postId || isNaN(postId)) return res.json(errResponse(baseResponse.CHECK_INPUT_PARAMETER));

  const deletePostResult = await postService.deletePost(postId, userId);
  return res.json(deletePostResult);
};

exports.editPost = async function (req, res) {
  const { userId } = req.verifiedToken;
  const { postId } = req.params;
  const { title, content } = req.body;

  if (!title && !content) return res.json(errResponse(baseResponse.VALUE_NOT_ENTERED));
  if (!postId || isNaN(postId)) return res.json(errResponse(baseResponse.CHECK_INPUT_PARAMETER));

  const editPostResult = await postService.editPost(title, content, id, userId);
  return res.json(editPostResult);
};

exports.addComment = async function (req, res) {
  const { userId } = req.verifiedToken;
  const { postId } = req.params;
  const { content, commentId } = req.body;

  if (!content || !postId || isNaN(postId)) return res.json(errResponse(baseResponse.CHECK_INPUT_PARAMETER));

  const addCommentResult = await postService.addComment(content, userId, postId, commentId);
  return res.json(addCommentResult);
};

exports.getComments = async function (req, res) {
  const { postId } = req.params;
  if (!postId || isNaN(postId)) return res.json(errResponse(baseResponse.CHECK_INPUT_PARAMETER));
  const getCommentsResult = await postService.getComments(postId);
  return res.json(getCommentsResult);
};
