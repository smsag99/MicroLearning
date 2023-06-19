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
  "/getAllstudentsOnClass/:id",
  isAuth,
  fetchAdmin,
  validate(crudStudentOnClassValidationSchema.read),
  // isCan("read", "StudentOnClass"),
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

//get studentOnClass by Id
router.get(
  "/getStudentById/:userID/:classID",
  validate(crudStudentOnClassValidationSchema.readStudentOnClass),
  isAuth,
  fetchAdmin,
  // isCan("read", "StudentOnClass"),
  async (req, res, next) => {
    try {
      const userID = req.params.userID;
      const classID = req.params.classID;
      const resault = await studentOnClassServices.getStudentByID(
        userID,
        classID
      );
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//get classes of student
router.get(
  "/getclassesofstudent/:id",
  validate(crudStudentOnClassValidationSchema.read),
  isAuth,
  fetchAdmin,
  // isCan("read", "StudentOnClass"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const resault = await studentOnClassServices.getClassesOfStudent(id);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

//create studentOnClass
router.post(
  "/addStudentToClass",
  validate(crudStudentOnClassValidationSchema.create),
  isAuth,
  fetchAdmin,
  // isCan("create", "StudentOnClass"),
  async (req, res, next) => {
    try {
      const { userId, classId, mark, progress, startTime, endTime } = req.body;
      const resault = await studentOnClassServices.addStudent(
        userId,
        classId,
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
  "/:userId/:classId",
  validate(crudStudentOnClassValidationSchema.update),
  isAuth,
  fetchAdmin,
  // isCan("update", "StudentOnClass"),
  async (req, res, next) => {
    try {
      req.body.userId = req.params.userId;
      req.body.classId = req.params.classId;
      const resault = await studentOnClassServices.updateStudent(req.body);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
// adding a task
router.put(
  "/doneTask/:userId/:classId/:taskId",
  validate(crudStudentOnClassValidationSchema.updateDone),
  isAuth,
  fetchAdmin,
  // isCan("update", "StudentOnClass"),
  async (req, res, next) => {
    try {
      req.body.userId = req.params.userId;
      req.body.classId = req.params.classId;
      req.body.taskId = req.params.taskId;
      const resault = await studentOnClassServices.updateTaskOfStudent(
        req.body
      );
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
