const express = require("express");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const validate = require("../../../middlewares/validate.middleware");
const crudTaskValidationSchema = require("../../../../validation/validation.task.services");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");
const uploader = require("../../../../services/file-upload");
const taskServices = require("../../../../services/course/task services");

//get all tasks
router.get(
  "/getalltasks",
  isAuth,
  fetchAdmin,
  // isCan("read", "Task"),
  async (req, res, next) => {
    try {
      const resault = await taskServices.getAllTasks();
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//get task by id
router.get(
  "/:id",
  validate(crudTaskValidationSchema.read),
  isAuth,
  fetchAdmin,
  // isCan("read", "Task"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resault = await taskServices.getTaskByID(id);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

//get tasks of chapter
router.get(
  "/gettasksofchapter/:id",
  validate(crudTaskValidationSchema.read),
  isAuth,
  fetchAdmin,
  // isCan("read", "Task"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resault = await taskServices.getTasksOfChapter(id);
      res.send(resault);
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
