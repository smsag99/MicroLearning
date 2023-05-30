const express = require("express");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const crudStudentOnClassValidationSchema = require("../../../../validation/validation.studentOnClass.services");
const validate = require("../../../middlewares/validate.middleware");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");
const studentOnClassServices = require("../../../../services/course/StudentsOnClass Services");

//get all studentOnClass
router.get(
  "/getAllstudentsOnClass",
  isAuth,
  fetchAdmin,
  isCan("read", "StudentOnClass"),
  async (req, res, next) => {
    try {
      const resault = await studentOnClassServices.getAllStudentsOnClass();
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

//get studentOnClass by Id
router.get(
  "/:id",
  validate(crudStudentOnClassValidationSchema.read),
  isAuth,
  fetchAdmin,
  isCan("read", "StudentOnClass"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resault = await seasonServices.getSeasonByID(id);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

//get studentOnClass by Id
router.get(
  "/getAllStudentsOnClass/:id",
  validate(crudStudentOnClassValidationSchema.read),
  isAuth,
  fetchAdmin,
  isCan("read", "StudentOnClass"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resault = await studentOnClassServices.getAllStudentsOnClass(id);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

//create studentOnClass
router.post(
  "/",
  validate(crudStudentOnClassValidationSchema.create),
  isAuth,
  fetchAdmin,
  isCan("create", "StudentOnClass"),
  async (req, res, next) => {
    try {
      const { studentId, classID, mark, progress, startTime, endTime } =
        req.body;
      const resault = await studentOnClassServices.addStudent(
        studentId,
        classID,
        mark,
        progress,
        startTime,
        endTime
      );
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//put studentOnClass
router.put(
  "/",
  validate(crudStudentOnClassValidationSchema.update),
  isAuth,
  fetchAdmin,
  isCan("update", "StudentOnClass"),
  async (req, res, next) => {
    try {
      req.body.id = req.params.id;
      const resault = await studentOnClassServices.updateStudent(req.body);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//delete studentOnClass
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
