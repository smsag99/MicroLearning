const express = require("express");
const authV1 = require("./auth.js");
const forgetPasswordV1 = require("./forgetPassword.routes.js");

const v1Loader = () => {
  const router = express.Router();
  router.use("/auth", authV1);
  router.use("/forgetPassword", forgetPasswordV1);
  return router;
};
module.exports = v1Loader;
