const express = require("express");
const authUserV1 = require("./user/auth.js");
const authAdminV1 = require("./admin/auth.js");

const v1Loader = () => {
  const router = express.Router();
  router.use("/authUser", authUserV1);
  router.use("/authAdmin", authAdminV1);
  return router;
};

module.exports = v1Loader;
