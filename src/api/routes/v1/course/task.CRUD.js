const express = require("express");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const validate = require("../../../middlewares/validate.middleware");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");
const uploader = require("../../../../services/file-upload");

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
    const uploader = require("../../../../services/common/uploader");
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
//uploader media
router.post(
  "/upload",
  isAuth,
  fetchAdmin,
  isCan("create", "Task"),
  (req, res, next) => {
    uploader(req, "media")
      .then((result) => {
        res.send(result[result.length - 1]);
      })
      .catch((error) => {
        return next(new ApiError(500, error.message));
      });
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
