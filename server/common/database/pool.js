const mysql = require("mysql2/promise");
const baseResponse = require("../../config/response/baseResponseStatus");
const APIError = require("../error/apiError");
const cache = require("../../config/cache");

//createPoolCluster
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: 3306,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const pool_2 = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: 3306,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool.on("acquire", function (connection) {
  console.log("Connection %d acquired", connection.threadId);
});
pool.on("enqueue", function () {
  console.log("Waiting for available connection slot");
});
pool.on("release", function (connection) {
  console.log("Connection %d released", connection.threadId);
});

async function masterFunc(query, params) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const [result] = await connection.query(query, params);
    connection.release();
    return result;
  } catch (err) {
    console.error(err);
    throw new APIError(baseResponse.DB_ERROR.message);
  }
}

async function slaveFunc(query, params) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const [result] = await connection.query(query, params);
    connection.release();
    return result;
  } catch (err) {
    console.error(err);
    throw new Error(baseResponse.DB_ERROR.message);
  }
}

module.exports = {
  masterFunc,
  slaveFunc,
};

// const getConnection = function (callback) {
//   pool.getConnection(function (err, connection) {
//     callback(err, connection);
//   });
// };
