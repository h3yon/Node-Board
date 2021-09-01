const express = require("./config/express");
const http2 = require("http2");
const { readFileSync } = require("fs");
const { NODE_ENV, PORT, SSL_CERT_PATH, SSL_KEY_PATH } = process.env;

const options = {
  allowHTTP1: true,
  cert: readFileSync(__dirname + SSL_CERT_PATH),
  key: readFileSync(__dirname + SSL_KEY_PATH),
};

http2.createSecureServer(options, express()).listen(PORT, async () => {
  console.info(`${NODE_ENV} - API Server Start At Port ${PORT}`);

});

/**
 * 2. 기존 방식(http)
 */
// express().listen(PORT);
// console.info(`${NODE_ENV} - API Server Start At Port ${PORT}`);

/**
 * 3. 나중에 Elastic
 */

// const elasticsearch = require("elasticsearch");
//
// const client = new elasticsearch.Client({
//   host: "localhost:9200",
//   log: "trace",
//   apiVersion: "7.2", // use the same version of your Elasticsearch instance
// });

// await client.index({
//   index: "boot-logs",
//   body: {
//     message: `Server application is up and running on port ${PORT}`,
//     timestamp: new Date(),
//   },
// });