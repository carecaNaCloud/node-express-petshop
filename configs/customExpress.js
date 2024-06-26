const express = require("express");
const consign = require("consign");
const parser  = require("body-parser");

module.exports = () => {
  const app = express();

  app.use(parser.urlencoded({extended: true}));
  app.use(parser.json());

  consign().include("controllers").into(app);

  return app;
};
