const express = require("express");

const bcrypt = require("bcrypt");

const {
  updateUser,
  getUserbyPhone,
  createUser,
  deleteUser,
} = require("../../../../services/user.services");

const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const validate = require("../../../middlewares/validate.middleware");
const manageUserValidationSchema = require("../../../../validation/validation.admin.manageUser.services");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");

router.get(
  "/:phone",
  validate(manageUserValidationSchema.read),
  isAuth,
  fetchAdmin,
  isCan("read", "User"),
  async (req, res) => {
    try {
      const { phone } = req.params;
      const resault = await getUserbyPhone(phone);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }
);

router.post(
  "/",
  validate(manageUserValidationSchema.create),
  isAuth,
  fetchAdmin,
  isCan("create", "User"),
  async (req, res) => {
    try {
      const { phone, password } = req.body;
      const user = await getUserbyPhone(phone);
      if (user) {
        throw new ApiError(403, "This User Already Exists!");
      } else {
        const resault = await createUser(phone, password);
        res.send(resault);
      }
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }
);
router.put(
  "/:phone",
  validate(manageUserValidationSchema.update),
  isAuth,
  fetchAdmin,
  isCan("update", "User"),
  async (req, res) => {
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
      return next(new ApiError(500, error.message));
    }
  }
);
router.delete(
  "/",
  isAuth,
  fetchAdmin,
  isCan("delete", "User"),
  async (req, res) => {
    try {
      const { phone } = req.body;
      const resault = await deleteUser(phone);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }
);

module.exports = router;
