const express = require("express");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const validate = require("../../../middlewares/validate.middleware");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");

//get chapter
router.get(
  "/",
  isAuth,
  fetchAdmin,
  isCan("read", "Chapter"),
  async (req, res, next) => {
    try {
      res.send("get chapter");
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//create chapter
router.post(
  "/",
  isAuth,
  fetchAdmin,
  isCan("create", "Chapter"),
  async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//put chapter
router.put(
  "/",
  isAuth,
  fetchAdmin,
  isCan("update", "Chapter"),
  async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//delete chapter
router.delete(
  "/",
  isAuth,
  fetchAdmin,
  isCan("delete", "Chapter"),
  async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

module.exports = router;
