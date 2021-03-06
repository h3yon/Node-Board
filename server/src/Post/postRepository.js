const pool_1 = require("../../common/database/pool");
const postQuery = require("./postQuery");
const myCache = require("../../config/cache");
const baseResponse = require("../../config/response/baseResponseStatus");
const APIError = require("../../common/error/apiError");

function getPosts(page) {
  let sql_query = ``;
  sql_query += postQuery.selectPost;
  sql_query += ` limit 10 OFFSET ?;`;
  const results = pool_1.slaveFunc(sql_query, page);
  return results;
}

function getSearchPosts(option, keyword, page) {
  let sql_query = ``;
  let params = [];
  sql_query += postQuery.selectPost;

  //제목
  if (option == 1) {
    sql_query += ` and title like concat('%',?,'%')`;
    params.push(keyword);
  }
  //내용
  if (option == 2) {
    sql_query += ` and content like concat('%',?,'%')`;
    params.push(keyword);
  }
  //제목 + 내용
  if (option == 3) {
    sql_query += ` and (content like concat('%',?,'%') or title like concat('%',?,'%'))`;
    params.push(keyword, keyword);
  }
  // 페이징
  sql_query += ` limit 10 OFFSET ?;`;
  params.push(page);

  const results = pool_1.slaveFunc(sql_query, params);
  return results;
}

function getDetailPost(postId) {
  let sql_query = ``;
  sql_query += postQuery.selectPost;
  sql_query += ` AND Post.postId = ?;`;
  console.log(postId);

  return new Promise((resolve, reject) => {
    pool_1
      .slaveFunc(sql_query, postId)
      .then((res) => {
        if (res.length < 1) throw new Error("존재하지 않는 POST");
        myCache.set(postId, res[0]);
        resolve(res[0]);
      })
      .catch((err) => {
        reject(new APIError(baseResponse.NO_EXISTS_POST.message, baseResponse.NO_EXISTS_POST.code));
      });
  });
}

function addPost(params) {
  const results = pool_1.masterFunc(postQuery.insertPost, params);
  return results;
}

function deletePost(params) {
  const results = pool_1.masterFunc(postQuery.deletePost, params);
  return results;
}

function editPost(title, content, postId, userId) {
  let sql_query = ``;
  let params;
  sql_query += postQuery.patchPost;

  if (title && content) {
    // title, content 모두 update 할 경우
    sql_query += `title = ?, content = ? `;
    params = [title, content, postId, userId];
  } else {
    // title, content 둘 중 하나 update 할 경우
    sql_query += title == 0 ? `content = ? ` : `title = ? `;
    params = title == 0 ? [content, postId, userId] : [title, postId, userId];
  }
  sql_query += `WHERE postId = ? and userId = ? and status = 1;`;

  const results = pool_1.masterFunc(sql_query, params);
  return results;
}

function addComment(content, userId, postId, commentId) {
  let sql_query = ``;
  sql_query += postQuery.insertComment;

  sql_query += commentId > 0 ? `?, (select IFNULL(max(seq+1), 1) from Comment c where commentId = ?));` : `0, 1);`;
  let params = commentId > 0 ? [content, userId, postId, commentId, commentId] : [content, userId, postId];

  const results = pool_1.masterFunc(sql_query, params);
  return results;
}

function getComments(postId) {
  const results = pool_1.slaveFunc(postQuery.selectComments, postId);
  return results;
}

module.exports = {
  getPosts,
  getSearchPosts,
  getDetailPost,
  addPost,
  deletePost,
  editPost,

  addComment,
  getComments,
};
