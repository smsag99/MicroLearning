/* eslint-disable linebreak-style */
const express = require("express");
const bcrypt = require("bcrypt");
const {
  updateAdmin,
  getAdminbyUserName,
  createAdmin,
  deleteAdmin,
  getAllAdmins,
} = require("../../../../services/admin.services");

const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const validate = require("../../../middlewares/validate.middleware");
const manageAdminValidationSchema = require("../../../../validation/validation.admin.manageAdmin.services");

router.get(
  "/getAllAdmins",
  isAuth,
  fetchAdmin,
  isCan("read", "Admin"),
  async (req, res) => {
    try {
      console.log("route get admins");
      const resault = await getAllAdmins();
      res.send(resault);
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
  async (req, res) => {
    try {
      console.log("route get admin");
      const { userName } = req.params;
      const resault = await getAdminbyUserName(userName);

      res.send(resault);
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }
);
router.post(
  "/",
  validate(manageAdminValidationSchema.create),
  isAuth,
  fetchAdmin,
  isCan("create", "Admin"),
  async (req, res) => {
    try {
      const { userName } = req.body;
      const admin = await getAdminbyUserName(userName);
      if (admin) {
        throw new ApiError(403, "This Admin Already Exists!");
      } else {
        const { user, password, permissions } = req.body;
        const resault = await createAdmin(user, password, permissions);
        res.send(resault);
      }
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }
);
router.put(
  "/:userName",
  validate(manageAdminValidationSchema.update),
  isAuth,
  fetchAdmin,
  isCan("update", "Admin"),
  async (req, res) => {
    try {
      req.body.password = (await bcrypt.hash(req.body.password, 10)).toString();
      req.body.userName = req.params.userName;
      req.body.permissions = JSON.stringify(req.body.permissions);
      console.log(req.body.permissions);
      const resault = await updateAdmin(req.body);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }
);
router.delete(
  "/",
  isAuth,
  fetchAdmin,
  isCan("delete", "Admin"),
  async (req, res) => {
    try {
      const { userName } = req.body;
      const resault = await deleteAdmin(userName);
      res.status(200).send(resault);
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }
);

module.exports = router;
