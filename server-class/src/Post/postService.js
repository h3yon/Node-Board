const { PostRepository } = require("./postRepository");
const myCache = require("../../config/cache");

exports.PostService = class PostService {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async getDetailPost(postId) {
    let post = myCache.get(postId);
    if (!post) post = await this.postRepository.getDetailPost(postId);
    return post;
  }
};
