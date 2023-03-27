const express = require("express");
const {
  signup,
  login,
  refreshToken,
  logout,
  updateAdmin,
  getAdminbyId,
  getAdminbyUserName,
  setRefereshToken,
  createAdmin,
  deleteAdmin,
} = require("../../../../services/admin.services.js");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware.js");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const { JsonWebTokenError } = require("jsonwebtoken");

router.get(
  "/",
  isAuth,
  fetchAdmin,
  isCan("read", "Admin"),
  async (req, res, next) => {
    try {
      console.log("route get admin");
      const { userName } = req.body;
      const resault = await getAdminbyUserName(userName);

      res.send(resault);
    } catch (error) {
      res.send("admin not found");
    }
  }
);

router.post(
  "/",
  isAuth,
  fetchAdmin,
  isCan("create", "Admin"),
  async (req, res, next) => {
    try {
      const { userName } = req.body;
      const admin = await getAdminbyUserName(userName);
      if (admin) {
        res.send("This User Already Exists!");
      } else {
        const { userName, password, permissions } = req.body;
        const resault = await createAdmin(userName, password, permissions);
        res.status(200).send(resault);
      }
    } catch (error) {
      res.send("bad request");
    }
  }
);
router.put(
  "/",
  isAuth,
  fetchAdmin,
  isCan("update", "Admin"),
  async (req, res, next) => {
    try {
      req.body.permissions = JSON.stringify(req.body.permissions);
      const resault = await updateAdmin(req.body);
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
  isCan("delete", "Admin"),
  async (req, res, next) => {
    try {
      const { userName } = req.body;
      const resault = await deleteAdmin(userName);
      res.status(200).send(resault);
    } catch (error) {
      res.send("bad request");
    }
  }
);

module.exports = router;
