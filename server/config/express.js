const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const { errorHandler } = require("../common/handler/middlewares");

console.log(process.cwd());
dotenv.config({ path: path.resolve(process.cwd(), process.env.NODE_ENV == "production" ? ".env" : ".env.dev") });

module.exports = function () {
  const app = express();
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride());
  app.use(cors());

  require("../src/User/userRoute")(app);
  require("../src/Post/postRoute")(app);

  app.use(errorHandler);

  return app;
};
