/* eslint-disable linebreak-style */
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const validate = require("../../../middlewares/validate.middleware");
const manageAdminValidationSchema = require("../../../../validation/validation.admin.manageAdmin.services");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");

const {
  updateAdmin,
  getAdminbyUserName,
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  omit,
} = require("../../../../services/admin.services");

router.get(
  "/getAllAdmins",
  isAuth,
  fetchAdmin,
  isCan("read", "Admin"),
  async (req, res, next) => {
    try {
      console.log("route get admins");
      const resault = await getAllAdmins();
      res.send(omit(resault));
    } catch (error) {
      res.send("admin database is empty");
    }
  }
);
router.get(
  "/:userName",
  validate(manageAdminValidationSchema.read),
  isAuth,
  fetchAdmin,
  isCan("read", "Admin"),
  async (req, res, next) => {
    try {
      console.log("route get admin");
      const { userName } = req.params;
      const resault = await getAdminbyUserName(userName);

      res.send(omit(resault));
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
router.post(
  "/",
  validate(manageAdminValidationSchema.create),
  isAuth,
  fetchAdmin,
  isCan("create", "Admin"),
  async (req, res, next) => {
    try {
      const { userName } = req.body;
      const admin = await getAdminbyUserName(userName);
      if (admin) {
        return next(new ApiError(400, "This Admin Already Exists!"));
      } else {
        const { userName, password, role } = req.body;
        const resault = await createAdmin(req.body);
        res.send({
          userName: userName,
          password: password,
          role: role,
        });
      }
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
router.put(
  "/:userName",
  validate(manageAdminValidationSchema.update),
  isAuth,
  fetchAdmin,
  isCan("update", "Admin"),
  async (req, res, next) => {
    try {
      if (req.body.password)
        req.body.password = (
          await bcrypt.hash(req.body.password, 10)
        ).toString();
      req.body.userName = req.params.userName;
      console.log(req.body.role);
      if (req.user.userName == req.body.userName) {
        console.log(req.body.userName + "  " + req.user.userName);
        const resault = await updateAdmin(req.body);
        res.send(omit(resault));
      }
      return next(
        new ApiError(
          400,
          "access denied! each user can only update their profile"
        )
      );
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
router.delete(
  "/",
  isAuth,
  fetchAdmin,
  isCan("delete", "Admin"),
  async (req, res, next) => {
    try {
      const { userName } = req.body;
      const resault = await deleteAdmin(userName);
      res.status(200).send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

module.exports = router;
