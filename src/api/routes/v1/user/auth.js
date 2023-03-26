const express = require("express");
const validate = require("./../../../middlewares/validate.middleware.js");
const userAuthValidationSchema = require("../../../../validation/validation.user.auth.services.js");
const {
  signup,
  verify,
  login,
  logout,
  refreshToken,
  forgetPassword,
  verifyForgetPassword,
} = require("../../../../services/user.services.js");
const router = express.Router();

router.post(
  "/signup",
  validate(userAuthValidationSchema.signup),
  async (req, res, next) => {
    try {
      const resault = await signup(req);
      return res.send(resault);
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/verify",
  validate(userAuthValidationSchema.verify),
  async (req, res, next) => {
    try {
      const resault = await verify(req);
      return res.send(resault);
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/login",
  validate(userAuthValidationSchema.login),
  async (req, res, next) => {
    try {
      const resault = await login(req);
      return res.send(resault);
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/logout",
  validate(userAuthValidationSchema.logout),
  async (req, res, next) => {
    try {
      const resault = await logout(req);
      return res.send(resault);
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/refreshToken",
  validate(userAuthValidationSchema.refreshToken),
  async (req, res, next) => {
    try {
      const resault = await refreshToken(req);
      return res.send(resault);
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/forgetpassword",
  validate(userAuthValidationSchema.forgetPassword),
  async (req, res, next) => {
    try {
      const resault = await forgetPassword(req);
      return res.send(resault);
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/verifyforgetpassword",
  validate(userAuthValidationSchema.verifyForgetPassword),
  async (req, res, next) => {
    try {
      const resault = await verifyForgetPassword(req);
      return res.send(resault);
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
