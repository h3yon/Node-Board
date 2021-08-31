// const express = require("express");
// const cors = require("cors");

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

const express = require("./config/express");
const { readFileSync } = require("fs");
const http2 = require("http2");
const { NODE_ENV, PORT, SSL_CERT_PATH, SSL_KEY_PATH } = process.env;
// const elasticsearch = require("elasticsearch");

// const client = new elasticsearch.Client({
//   host: "localhost:9200",
//   log: "trace",
//   apiVersion: "7.2", // use the same version of your Elasticsearch instance
// });

// const options = {
//   allowHTTP1: true,
//   cert: readFileSync(__dirname + SSL_CERT_PATH),
//   key: readFileSync(__dirname + SSL_KEY_PATH),
// };

// http2.createSecureServer(options, express()).listen(PORT, async () => {
//   console.info(`${NODE_ENV} - API Server Start At Port ${PORT}`);

// await client.index({
//   index: "boot-logs",
//   body: {
//     message: `Server application is up and running on port ${PORT}`,
//     timestamp: new Date(),
//   },
// });
// });

express().listen(PORT);
console.info(`${NODE_ENV} - API Server Start At Port ${PORT}`);
