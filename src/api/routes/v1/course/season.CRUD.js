const express = require("express");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const validate = require("../../../middlewares/validate.middleware");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");

//get season
router.get(
  "/",
  isAuth,
  fetchAdmin,
  isCan("read", "Season"),
  async (req, res, next) => {
    try {
      res.send("get season");
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//create season
router.post(
  "/",
  isAuth,
  fetchAdmin,
  isCan("create", "Season"),
  async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//put season
router.put(
  "/",
  isAuth,
  fetchAdmin,
  isCan("update", "Season"),
  async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//delete season
router.delete(
  "/",
  isAuth,
  fetchAdmin,
  isCan("delete", "Season"),
  async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
module.exports = router;
