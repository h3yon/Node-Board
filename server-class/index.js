const express = require("./config/express");
const { readFileSync } = require("fs");
const http2 = require("http2");
const { NODE_ENV, PORT, SSL_CERT_PATH, SSL_KEY_PATH } = process.env;

/**
 * 1. 기존 express(https)
 */
const options = {
  allowHTTP1: true,
  cert: readFileSync(__dirname + SSL_CERT_PATH),
  key: readFileSync(__dirname + SSL_KEY_PATH),
};

http2.createSecureServer(options, express()).listen(PORT, async () => {
  console.info(`${NODE_ENV} - API Server Start At Port ${PORT}`);
});

/**
 * 2. 기존 express(http)
 */
// express().listen(PORT);
// console.info(`${NODE_ENV} - API Server Start At Port ${PORT}`);

/**
 * 3. 실패 버전
 * const cors = require("cors"); 필요
 */
// class Server {
//   app = express();
//   constructor() {
//     this.config();
//     this.routes();
//   }
//   config() {
//     this.app.set("port", process.env.PORT || 3000);
//     this.app.use(cors());
//     this.app.use(express.json());
//     this.app.use(
//       express.urlencoded({
//         extended: false,
//       })
//     );
//   }
//   routes() {
//     this.app.use("/api/posts", require("./src/Post/postRoute"));
//   }
//   start() {
//     this.app.listen(this.app.get("port"), () => {
//       console.log("server on port " + this.app.get("port"));
//     });
//   }
// }

// new Server().start();
