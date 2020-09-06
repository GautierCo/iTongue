require("dotenv").config();

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require(path.resolve("doc/swaggerOptions"));

const router = require("./app/routes");

const app = express();

const logStream = fs.createWriteStream(path.join("logs", "access.log"), { flags: "a" });
morgan.token("err", (_, res) => res.errorMsg);
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"\n:err',
    { stream: logStream }
  )
);

app.use(cors());

app.use(express.static(path.resolve("app/public")));

app.use(express.urlencoded({ extended: true }), express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      deepLinking: true,
      filter: true,
      defaultModelsExpandDepth: -1,
      defaultModelExpandDepth: 3
    }
  })
);

app.use(router);

module.exports = app;
