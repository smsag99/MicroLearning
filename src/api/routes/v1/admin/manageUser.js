const express = require("express");
const {
  signup,
  login,
  refreshToken,
  logout,
  updateUser,
  getUserbyId,
  getUserbyPhone,
  setRefereshToken,
  createUser,
  deleteUser,
} = require("../../../../services/user.services.js");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware.js");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const validate = require("./../../../middlewares/validate.middleware.js");
const manageUserValidationSchema = require("./../../../../validation/validation.admin.manageUser.services");
const bcrypt = require("bcrypt");

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
      res.send(resault);
    } catch (error) {
      res.send("user not found");
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
        res.send("This User Already Exists!");
      } else {
        const resault = await createUser(phone, password);
        res.status(200).send(resault);
      }
    } catch (error) {
      res.send("bad request");
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
      if (req.body.password)
        req.body.password = (
          await bcrypt.hash(req.body.password, 10)
        ).toString();
      req.body.phone = req.params.phone;
      const resault = await updateUser(req.body);
      res.status(200).send(resault);
    } catch (error) {
      res.send("bad request");
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
      res.status(200).send(resault);
    } catch (error) {
      res.send("bad request");
    }
  }
);

module.exports = router;
