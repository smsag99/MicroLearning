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

router.get(
  "/",
  isAuth,
  fetchAdmin,
  isCan("read", "User"),
  async (req, res, next) => {
    try {
      const { phone } = req.body;
      const resault = await getUserbyPhone(phone);
      res.send(resault);
    } catch (error) {
      res.send("user not found");
    }
  }
);

router.post(
  "/",
  isAuth,
  fetchAdmin,
  isCan("creat", "User"),
  async (req, res, next) => {
    try {
      const { phone, password } = req.body;
      const resault = await createUser(phone, password);
      res.status(200).send(resault);
    } catch (error) {
      res.send("bad request");
    }
  }
);
router.put(
  "/",
  isAuth,
  fetchAdmin,
  isCan("update", "User"),
  async (req, res, next) => {
    try {
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
