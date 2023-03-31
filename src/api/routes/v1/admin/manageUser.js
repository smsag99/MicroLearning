/* eslint-disable linebreak-style */
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const validate = require("../../../middlewares/validate.middleware");
const manageUserValidationSchema = require("../../../../validation/validation.admin.manageUser.services");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");

const {
  updateUser,
  getAllUsers,
  getUserbyPhone,
  createUser,
  deleteUser,
  omit,
} = require("../../../../services/user.services");

router.get(
  "/getAllUsers",
  validate(manageUserValidationSchema.getAll),
  isAuth,
  fetchAdmin,
  isCan("read", "User"),
  async (req, res, next) => {
    try {
      const { size, page } = req.query;
      console.log(size, page);
      const resault = await getAllUsers(size, page);
      res.send(resault);
    } catch (error) {
      res.send("the database is empty");
    }
  }
);
router.get(
  "/:phone",
  validate(manageUserValidationSchema.read),
  isAuth,
  fetchAdmin,
  isCan("read", "User"),
  async (req, res, next) => {
    try {
      const { phone } = req.params;
      const resault = await getUserbyPhone(phone);
      res.send(omit(resault));
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

router.post(
  "/",
  validate(manageUserValidationSchema.create),
  isAuth,
  fetchAdmin,
  isCan("create", "User"),
  async (req, res, next) => {
    try {
      const { phone, password } = req.body;
      const user = await getUserbyPhone(phone);
      if (user) {
        return next(new ApiError(403, "This User Already Exists!"));
      } else {
        const resault = await createUser(phone, password);
        res.send({
          phone: phone,
          password: password,
        });
      }
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
router.put(
  "/:phone",
  validate(manageUserValidationSchema.update),
  isAuth,
  fetchAdmin,
  isCan("update", "User"),
  async (req, res, next) => {
    try {
      if (req.body.password) {
        req.body.password = (
          await bcrypt.hash(req.body.password, 10)
        ).toString();
      }
      req.body.phone = req.params.phone;
      const resault = await updateUser(req.body);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
router.delete(
  "/",
  isAuth,
  fetchAdmin,
  isCan("delete", "User"),
  async (req, res, next) => {
    try {
      const { phone } = req.body;
      const resault = await deleteUser(phone);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

module.exports = router;
