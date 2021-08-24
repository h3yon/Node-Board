const express = require("./config/express");
// const { logger } = require("./config/winston");
const fs = require("fs");
const http2 = require("http2");
const port = process.env.PORT;

const options = {
  allowHTTP1: true,
  cert: fs.readFileSync(__dirname + process.env.SSL_CERT_PATH),
  key: fs.readFileSync(__dirname + process.env.SSL_KEY_PATH),
};

http2.createSecureServer(options, express()).listen(port, () => {
  console.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);
});

// express().listen(port);
// console.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);
