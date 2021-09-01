const { PostRepository } = require("./postRepository");
const myCache = require("../../config/cache");
const baseResponse = require("../../config/response/baseResponseStatus");
const { response, errResponse } = require("../../config/response/index");

exports.PostService = class PostService {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async getDetailPost(postId) {
    let post = myCache.get(postId);
    if (!post) post = await this.postRepository.getDetailPost(postId);
    return post;
  }

  async getPosts(option, keyword, page) {
    let posts;
    const pageStart = (Number(page) - 1) * 10;

    if (option && 0 < option < 4) posts = await this.postRepository.getSearchPosts(option, keyword, pageStart);
    else posts = await this.postRepository.getPosts(pageStart);
    return response(baseResponse.SUCCESS_GET_POSTS, posts);
  }

  async addPost(title, userId, content) {
    const params = [title, userId, content];

    const result = await this.postRepository.addPost(params);
    return response(baseResponse.SUCCESS_ADD_POSTS, result.insertId);
  }

  async deletePost(postId, userId) {
    let value = myCache.get(postId);
    if (!value) value = await this.postRepository.getDetailPost(postId);
    if (value.userId != userId) return errResponse(baseResponse.NO_PERMISSON_OR_INFO);

    const params = [postId, userId];
    const result = await this.postRepository.deletePost(params);

    if (result.changedRows < 1) return errResponse(baseResponse.NO_PERMISSON_OR_INFO);
    return response(baseResponse.SUCCESS_DELETE_POST, postId);
  }

  async editPost(title, content, postId, userId) {
    let targetTitle,
      targetContent = 0;
    let value = myCache.get(postId);

    if (!value) value = await this.postRepository.getDetailPost(postId);
    if (value.userId != userId) return errResponse(baseResponse.NO_PERMISSON_OR_INFO);
    if (!title && !target) return errResponse(baseResponse.CHECK_INPUT_PARAMETER);

    if (title) targetTitle = title;
    if (content) targetContent = content;

    const result = await this.postRepository.editPost(targetTitle, targetContent, postId, userId);
    if (result.changedRows < 1) return errResponse(baseResponse.ALREADY_EXISTS);
    return response(baseResponse.SUCCESS_EDIT_POST);
  }

  async addComment(content, userId, postId, commentId) {
    let parentCommentId = 0;
    const value = myCache.has(postId);

    if (!value) await this.sitory.getDetailPost(postId);
    if (commentId) parentCommentId = commentId;

    const result = await this.postRepository.addComment(content, userId, postId, parentCommentId);
    return response(baseResponse.SUCCESS_ADD_COMMENT, result.insertId);
  }

  async getComments(postId) {
    const comments = await this.postRepository.getComments(postId);
    return response(baseResponse.SUCCESS_GET_COMMENTS, comments);
  }
};
