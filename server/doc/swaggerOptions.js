const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "iTongue API",
    description: "Serves datas for iTongue client",
    version: "1.0.0"
  },
  host: process.env.APP_HOST, // Host (optional)
  basePath: "/", // Pass to v1 in production
  produces: ["application/json"],
  consumes: ["application/json", "application/x-www-form-urlencoded", "multipart/form-data"],
  schemes: ["http"],
  securityDefinitions: {},
  filter: true
};

const options = {
  swaggerDefinition,
  apis: [path.resolve("app/routes/*.js"), path.resolve("doc/**/*.yaml")]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
