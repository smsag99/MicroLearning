const express = require("express");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const validate = require("../../../middlewares/validate.middleware");
const crudCourseValidationSchema = require("../../../../validation/validation.course.services");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");
const courseServices = require("../../../../services/course/Course.services");

//get all courses
router.get(
  "/getAllCourses",
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
//get by id

router.get(
  "/:id",
  validate(crudCourseValidationSchema.read),
  isAuth,
  fetchAdmin,
  isCan("read", "Course"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resault = await getCourseByID(id);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//create course
router.post(
  "/",
  validate(crudCourseValidationSchema.create),
  isAuth,
  fetchAdmin,
  isCan("create", "Course"),
  async (req, res, next) => {
    try {
      const { teacherId, title, description } = req.body;
      await courseServices.createEmptyCourse(teacherId, title, description);
      res.send();
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//update course
router.put(
  "/:id",
  validate(crudCourseValidationSchema.update),
  isAuth,
  fetchAdmin,
  isCan("update", "Course"),
  async (req, res, next) => {
    try {
      req.body.id = req.params.id;
      courseServices.updateCourse(req.body);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
router.put(
  "/lock/:id",
  validate(crudCourseValidationSchema.lock),
  isAuth,
  fetchAdmin,
  isCan("update", "Course"),
  async (req, res, next) => {
    try {
      courseServices.lockStatus(req.params.id, req.body.lockStatus);
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
