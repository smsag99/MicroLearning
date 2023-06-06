const express = require("express");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const validate = require("../../../middlewares/validate.middleware");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");

//get task
router.get(
  "/",
  isAuth,
  fetchAdmin,
  // isCan("read", "Task"),
  async (req, res, next) => {
    try {
      res.send("get task");
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//create task
router.post(
  "/",
  isAuth,
  fetchAdmin,
  isCan("create", "Task"),
  async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//put task
router.put(
  "/",
  isAuth,
  fetchAdmin,
  isCan("update", "Task"),
  async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//delete task
router.delete(
  "/",
  isAuth,
  fetchAdmin,
  isCan("delete", "Task"),
  async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
module.exports = router;
