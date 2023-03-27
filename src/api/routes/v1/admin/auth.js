const express = require("express");
const {
  signup,
  login,
  refreshToken,
  logout,
} = require("../../../../services/admin.services.js");
const router = express.Router();
const authMid = require("../../../middlewares/auth.middleware.js");
const adminAuthValidationSchema = require("../../../../validation/validation.admin.auth.services.js");
const validate = require("./../../../middlewares/validate.middleware.js");

router.post(
  "/signup",
  validate(adminAuthValidationSchema.signup),
  async (req, res, next) => {
    try {
      const { userName, password, permissions } = req.body;
      const resault = await signup(userName, password, permissions);
      return res.send(resault);
    } catch (error) {
      return next(error);
    }
  }
);
router.post(
  "/login",
  validate(adminAuthValidationSchema.login),
  async (req, res, next) => {
    try {
      const { userName, password } = req.body;
      const resault = await login(userName);
      return res.send(resault);
    } catch (error) {
      return next(error);
    }
  }
);
router.post(
  "/refreshToken",
  validate(adminAuthValidationSchema.refreshToken),
  async (req, res, next) => {
    try {
      const { userName } = req.body;
      const resault = await refreshToken(userName);
      return res.send(resault);
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/logout",
  validate(adminAuthValidationSchema.logout),
  async (req, res, next) => {
    try {
      const { userName } = req.body;
      const resault = await logout(userName);
      return res.send(resault);
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
