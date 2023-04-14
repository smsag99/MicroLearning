const express = require("express");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const validate = require("../../../middlewares/validate.middleware");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");
const courseServices = require("../../../../services/course/Course.services");
//get course
router.get(
  "/",
  isAuth,
  fetchAdmin,
  isCan("read", "Course"),
  async (req, res, next) => {
    try {
      res.send("get course");
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

//create course
router.post(
  "/",
  isAuth,
  fetchAdmin,
  isCan("create", "Course"),
  async (req, res, next) => {
    try {
      const { name, teacherId, title, description } = req.body;
      await courseServices.createEmptyCourse(
        name,
        teacherId,
        title,
        description
      );
      res.send();
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//update course
router.put(
  "/",
  isAuth,
  fetchAdmin,
  isCan("update", "Course"),
  async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//delete course
router.delete(
  "/",
  isAuth,
  fetchAdmin,
  isCan("delete", "Course"),
  async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

module.exports = router;
