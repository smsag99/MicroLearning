/* eslint-disable linebreak-style */
const express = require("express");

const {
  signup,
  login,
  refreshToken,
  logout,
  checkRefreshToken,
} = require("../../../../services/admin.services");

const router = express.Router();
const adminAuthValidationSchema = require("../../../../validation/validation.admin.auth.services");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const validate = require("../../../middlewares/validate.middleware");

require("dotenv").config();

router.post(
  "/signup",
  validate(adminAuthValidationSchema.signup),
  async (req, res, next) => {
    if (process.env.ENVIRONMENT == "development")
      try {
        const { userName, password, permissions } = req.body;
        const resault = await signup(userName, password, permissions);
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
  validate(adminAuthValidationSchema.login),
  async (req, res, next) => {
    try {
      const { userName, password } = req.body;
      const resault = await login(userName, password);
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
  isAuth,
  validate(adminAuthValidationSchema.refreshToken),
  async (req, res, next) => {
    try {
      const { RefreshToken } = req.body;
      console.log(RefreshToken);
      const adminId = await checkRefreshToken(receivedRefreshToken);
      console.log(adminId);
      if (adminId) {
        const resault = await refreshToken(adminId);
        return res.send({
          Refresh_Token: resault.refreshtoken,
          Access_Token: resault.accesstoken,
        });
      }
      return next(new ApiError(412, "access denied! refresh token not valid"));
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

router.post(
  "/logout",
  isAuth,
  //validate(adminAuthValidationSchema.logout),
  async (req, res, next) => {
    try {
      const id = req.client.id;
      const resault = await logout(id);
      return res.send();
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

module.exports = router;
