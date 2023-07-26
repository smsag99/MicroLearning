const express = require("express");
const routes = require("../api/routes");
require("dotenv").config({ path: "../.env" });
const httpstatus = require("http-status-codes");
const cors = require("cors");
const {
  ApiError,
  errorHandler,
} = require("../api/middlewares/errorHandling.middleware");

const expressLoader = async (app) => {
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.json());
  app.use("/api", routes());

  app.listen(process.env.PORT, () => {
    console.log(`on port ${process.env.PORT}`);
  });

  app.use((req, res, next) => {
    const err = new ApiError(404, "Not Found");
    next(err);
  });

  app.use(errorHandler);
};

module.exports = expressLoader;
