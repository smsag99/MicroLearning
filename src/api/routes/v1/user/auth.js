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
  checkIfBlocked,
  getUserbyId,
} = require("../../../../services/user.services");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");

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
      return next(new ApiError(error.statusCode, error.message));
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
      return res.send({
        Refresh_Token: resault.refreshtoken,
        Access_Token: resault.accesstoken,
      });
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

router.post(
  "/login",
  validate(userAuthValidationSchema.login),
  async (req, res, next) => {
    try {
      const { phone, password } = req.body;
      if (await checkIfBlocked(phone))
        return next(new ApiError(403, "access denied! This user is blocked."));
      const resault = await login(phone, password);
      return res.send({
        Refresh_Token: resault.refreshtoken,
        Access_Token: resault.accesstoken,
      });
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

router.post(
  "/refreshToken",
  validate(userAuthValidationSchema.refreshToken),
  async (req, res, next) => {
    try {
      const { RefreshToken } = req.body;
      const userId = await checkRefreshToken(RefreshToken);
      const user = await getUserbyId(userId);
      if (await checkIfBlocked(user.phone))
        return next(new ApiError(403, "access denied! This user is blocked."));
      if (userId) {
        const resault = await refreshToken(userId);
        return res.send({
          Refresh_Token: resault.refreshtoken,
          Access_Token: resault.accesstoken,
        });
      }
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
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
      return res.send();
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

router.post(
  "/forgetpassword",
  validate(userAuthValidationSchema.forgetPassword),
  async (req, res, next) => {
    try {
      const { phone } = req.body;
      if (await checkIfBlocked(phone))
        return next(new ApiError(403, "access denied! This user is blocked."));
      const resault = await forgetPassword(phone);
      return res.send();
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
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
      return res.send();
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

module.exports = router;
