const express = require('express');

const {
  signup,
  login,
  refreshToken,
  logout,
  checkRefreshToken,
} = require('../../../../services/admin.services');

const router = express.Router();
const adminAuthValidationSchema = require('../../../../validation/validation.admin.auth.services');
const validate = require('../../../middlewares/validate.middleware');

require('dotenv').config();

router.post(
  '/signup',
  validate(adminAuthValidationSchema.signup),
  async (req, res, next) => {
    try {
      const { userName, password, permissions } = req.body;
      const resault = await signup(userName, password, permissions);
      return res.send(resault);
    } catch (error) {
      return next(error);
    }
  },
);
router.post(
  '/login',
  validate(adminAuthValidationSchema.login),
  async (req, res, next) => {
    try {
      const { userName, password } = req.body;
      const resault = await login(userName, password);
      return res.send({
        token: resault,
      });
    } catch (error) {
      return next(error);
    }
  },
);
router.post(
  '/refreshToken',
  validate(adminAuthValidationSchema.refreshToken),
  async (req, res, next) => {
    try {
      const { receivedRefreshToken } = req.body;
      console.log(receivedRefreshToken);
      const adminId = await checkRefreshToken(receivedRefreshToken);
      console.log(adminId);
      if (adminId) {
        const resault = await refreshToken(adminId);
        return res.send(resault);
      }
      return res.send('refresh token not valid');
    } catch (error) {
      return next(error);
    }
  },
);

router.post(
  '/logout',
  validate(adminAuthValidationSchema.logout),
  async (req, res, next) => {
    try {
      const { userName } = req.body;
      const resault = await logout(userName);
      return res.send(resault);
    } catch (error) {
      return next(error);
    }
  },
);

module.exports = router;
