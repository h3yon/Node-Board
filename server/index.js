const express = require("./config/express");
const { readFileSync } = require("fs");
const http2 = require("http2");
const { NODE_ENV, PORT, SSL_CERT_PATH, SSL_KEY_PATH } = process.env;

const options = {
  allowHTTP1: true,
  cert: readFileSync(__dirname + SSL_CERT_PATH),
  key: readFileSync(__dirname + SSL_KEY_PATH),
};

http2.createSecureServer(options, express()).listen(PORT, () => {
  console.info(`${NODE_ENV} - API Server Start At Port ${PORT}`);
});

// express().listen(PORT);
// console.info(`${NODE_ENV} - API Server Start At Port ${PORT}`);
