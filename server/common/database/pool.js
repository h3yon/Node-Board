const mysql = require("mysql2/promise");
const baseResponse = require("../../config/response/baseResponseStatus");
const APIError = require("../error/apiError");

//createPoolCluster
const pool_1 = mysql.createPool({
  host: process.env.MASTER_DB_HOST,
  user: process.env.MASTER_DB_USER,
  port: process.env.MASTER_DB_PORT,
  password: process.env.MASTER_DB_PASSWORD,
  database: process.env.MASTER_DB_DATABASE,
});

const pool_2 = mysql.createPool({
  host: process.env.SLAVE_DB_HOST,
  user: process.env.SLAVE_DB_USER,
  port: process.env.SLAVE_DB_PORT,
  password: process.env.SLAVE_DB_PASSWORD,
  database: process.env.SLAVE_DB_DATABASE,
});

pool_2.on("acquire", function (connection) {
  console.log("Connection %d acquired", connection.threadId);
});
pool_2.on("enqueue", function () {
  console.log("Waiting for available connection slot");
});
pool_2.on("release", function (connection) {
  console.log("Connection %d released", connection.threadId);
});

async function masterFunc(query, params) {
  try {
    const connection = await pool_1.getConnection(async (conn) => conn);
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
    const connection = await pool_2.getConnection(async (conn) => conn);
    const [result] = await connection.query(query, params);
    connection.release();
    return result;
  } catch (err) {
    console.error(err);
    throw new APIError(baseResponse.DB_ERROR.message);
  }
}

module.exports = {
  masterFunc,
  slaveFunc,
};
