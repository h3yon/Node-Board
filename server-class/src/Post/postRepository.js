const pool_1 = require("../../common/database/pool");
const postQuery = require("./postQuery");
const baseResponse = require("../../config/response/baseResponseStatus");
const APIError = require("../../common/error/apiError");
const myCache = require("../../config/cache");

const { errResponse } = require("../../config/response");

exports.PostRepository = class PostRepository {
  async getDetailPost(postId) {
    let sql_query = ``;
    sql_query += postQuery.selectPost;
    sql_query += ` AND Post.postId = ?;`;

    return new Promise((resolve, reject) => {
      pool_1
        .slaveFunc(sql_query, postId)
        .then((res) => {
          if (res.length > 0) {
            myCache.set(postId, res[0]);
            resolve(res[0]);
          } else {
            resolve(errResponse(baseResponse.NO_EXISTS_POST));
          }
        })
        .catch((err) => {
          reject(new APIError(baseResponse.NO_EXISTS_POST.message, baseResponse.NO_EXISTS_POST.code));
          console.error("에러: ", err);
        });
    });
  }
};
