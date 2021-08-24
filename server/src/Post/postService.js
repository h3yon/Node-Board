const postRepository = require("./postRepository");
const myCache = require("../../config/cache");
const { errResponse, response } = require("../../config/response/index");
const baseResponse = require("../../config/response/baseResponseStatus");

async function getPosts(option, keyword, page) {
  let posts;
  const pageStart = (Number(page) - 1) * 10;

  if (option && 0 < option < 4) posts = await postRepository.getSearchPosts(option, keyword, pageStart);
  else posts = await postRepository.getPosts(pageStart);
  return response(baseResponse.SUCCESS_GET_POSTS, posts);
}

async function addPost(title, userId, content) {
  const params = [title, userId, content];
  const result = await postRepository.addPost(params);
  myCache.set(result.insertId, userId);
  return response(baseResponse.SUCCESS_ADD_POSTS, result.insertId);
}

async function getDetailPost(postId) {
  const post = await postRepository.getDetailPost(postId);
  return response(baseResponse.SUCCESS_GET_POST, post);
}

async function deletePost(postId, userId) {
  const value = myCache.get(postId);
  if (!value || value != userId) return errResponse(baseResponse.NO_PERMISSON_OR_INFO);

  const params = [postId, userId];
  const result = await postRepository.deletePost(params);

  if (result.changedRows < 1) return errResponse(baseResponse.NO_PERMISSON_OR_INFO);
  return response(baseResponse.SUCCESS_DELETE_POST, postId);
}

async function editPost(title, content, postId, userId) {
  let targetTitle = 0;
  let targetContent = 0;
  const value = myCache.get(postId);
  if (!value || value != userId) return errResponse(baseResponse.NO_PERMISSON_OR_INFO);

  if (title) targetTitle = title;
  if (content) targetContent = content;

  const result = await postRepository.editPost(targetTitle, targetContent, postId, userId);
  if (result.changedRows < 1) return errResponse(baseResponse.NO_PERMISSON_OR_INFO);
  return response(baseResponse.SUCCESS_EDIT_POST);
}

async function addComment(content, userId, postId, commentId) {
  let parentCommentId = 0;
  const value = myCache.has(postId);
  if (!value) return errResponse(baseResponse.NO_EXISTS);

  if (commentId) parentCommentId = commentId;

  const result = await postRepository.addComment(content, userId, postId, parentCommentId);
  return response(baseResponse.SUCCESS_ADD_COMMENT, result.insertId);
}

async function getComments(postId) {
  // const value = myCache.has(postId);
  // if (!value) return errResponse(baseResponse.NO_EXISTS);

  const comments = await postRepository.getComments(postId);
  return response(baseResponse.SUCCESS_GET_COMMENTS, comments);
}

module.exports = {
  getPosts,
  addPost,
  getDetailPost,
  deletePost,
  editPost,

  addComment,
  getComments,
};