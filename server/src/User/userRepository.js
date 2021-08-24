const pool_1 = require("../../common/database/pool");
const userQuery = require("./userQuery");
// const baseResponse = require("../config/response/baseResponseStatus");

async function insertUser(email, password) {
  const params = [email, password];
  const results = await pool_1.masterFunc(userQuery.insertUser, params);
  // console.log(results);
  return results;
}

async function selectUser(email) {
  const results = await pool_1.slaveFunc(userQuery.selectUser, email);
  return results;
}

async function loginRepo(email, password) {
  const params = [email, password];
  const results = await pool_1.slaveFunc(userQuery.loginUser, params);
  return results;
}

module.exports = {
  insertUser,
  selectUser,
  loginRepo,
};

// class UserRepository {
//   constructor() {}

//   insertUser(email, password) {
//     return new Promise((resolve, reject) => {
//       const query = [];
//       query.push("INSERT INTO User(email,password) VALUES (?, ?);");
//       const params = { email, password };
//       pool_1(CommonUtil_1.join(query), params)
//         .then((result) => {
//           console.log("유저 레퍼지토리 결과", result);
//           resolve(
//             CommonUtil_1.resolve({
//               userId: userId,
//             })
//           );
//         })
//         .catch((error) => {
//           reject(errResponse(baseResponse.DB_ERROR));
//         });
//     });
//   }
// }
