const express = require("express");
const validate = require("../../../middlewares/validate.middleware");
const userAuthValidationSchema = require("../../../../validation/validation.user.auth.services");
const {
  signup,
  verify,
  login,
  logout,
  refreshToken,
  forgetPassword,
  verifyForgetPassword,
  checkRefreshToken,
} = require("../../../../services/user.services");

const router = express.Router();

router.post(
  "/signup",
  validate(userAuthValidationSchema.signup),
  async (req, res, next) => {
    try {
      const { phone } = req.body;
      const resault = await signup(phone);
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
      const { phone, code, password } = req.body;
      console.log(code);
      const resault = await verify(phone, code, password);
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
      const { phone, password } = req.body;
      const resault = await login(phone, password);
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
      const { receivedRefreshToken } = req.body;
      const userId = await checkRefreshToken(receivedRefreshToken);
      if (userId) {
        const resault = await refreshToken(userId);
        return res.send(resault);
      }
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
      const { phone } = req.body;
      const resault = await logout(phone);
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
      const { phone } = req.body;
      const resault = await forgetPassword(phone);
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
      const { phone, code, password } = req.body;
      const resault = await verifyForgetPassword(phone, code, password);
      return res.send(resault);
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
