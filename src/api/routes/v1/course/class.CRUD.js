const express = require("express");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const validate = require("../../../middlewares/validate.middleware");
const crudClassValidationSchema = require("../../../../validation/validation.class.services");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");
const classServices = require("../../../../services/course/Class services");

//get all class
router.get(
  "/getAllClasses",
  isAuth,
  fetchAdmin,
  // isCan("read", "Class"),
  async (req, res, next) => {
    try {
      const resault = await classServices.getAllClasses();
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

//get by id
router.get(
  "/:id",
  validate(crudClassValidationSchema.read),
  isAuth,
  fetchAdmin,
  // isCan("read", "Class"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resault = await classServices.getClassByID(id);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

//create class
router.post(
  "/",
  validate(crudClassValidationSchema.create),
  isAuth,
  fetchAdmin,
  // isCan("create", "Class"),
  async (req, res, next) => {
    try {
      const { title, startTime, endTime, capacity, courseId, mentorId } =
        req.body;
      const resault = await classServices.createEmptyClass(
        title,
        startTime,
        endTime,
        capacity,
        courseId,
        mentorId
      );
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//update class
router.put(
  "/:id",
  validate(crudClassValidationSchema.update),
  isAuth,
  fetchAdmin,
  isCan("update", "Class"),
  async (req, res, next) => {
    try {
      req.body.id = req.params.id;
      const resault = await classServices.updateClass(req.body);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//lock class
router.put(
  "/lock/:id",
  validate(crudClassValidationSchema.lock),
  isAuth,
  fetchAdmin,
  isCan("update", "Class"),
  async (req, res, next) => {
    try {
      const resault = await classServices.lockStatus(
        req.params.id,
        req.body.lockStatus
      );
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//delete class
router.delete(
  "/",
  isAuth,
  fetchAdmin,
  isCan("delete", "Class"),
  async (req, res, next) => {
    try {
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

module.exports = router;
