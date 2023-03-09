const express = require("express");
const authV1 = require("./auth.js");

const v1Loader = () => {
  const router = express.Router();
  router.use("/auth", authV1);
  return router;
};
module.exports = v1Loader;
console.log("t");
