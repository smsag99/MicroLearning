const express = require("express");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const crudChapterValidationSchema = require("../../../../validation/validation.chapter.services");
const validate = require("../../../middlewares/validate.middleware");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");
const chapterServices = require("../../../../services/course/chapter services");

//get all chapters
router.get(
  "/getAllChapters",
  isAuth,
  fetchAdmin,
  // isCan("read", "Chapter"),
  async (req, res, next) => {
    try {
      const resault = await chapterServices.getAllChapters();
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

//get season by Id
router.get(
  "/:id",
  validate(crudChapterValidationSchema.read),
  isAuth,
  fetchAdmin,
  // isCan("read", "Chapter"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resault = await chapterServices.getChapterByID(id);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

//get chapters of season
router.get(
  "/getChaptersOfSeason/:id",
  validate(crudChapterValidationSchema.read),
  isAuth,
  fetchAdmin,
  // isCan("read", "Chapter"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resault = await chapterServices.getChaptersOfSeason(id);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

//create Chapter
router.post(
  "/",
  validate(crudChapterValidationSchema.create),
  isAuth,
  fetchAdmin,
  isCan("create", "Chapter"),
  async (req, res, next) => {
    try {
      const { title, seasonId, priority } = req.body;
      const resault = await chapterServices.createEmptyChapter(
        seasonId,
        title,
        priority
      );
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//put Chapter
router.put(
  "/",
  validate(crudChapterValidationSchema.update),
  isAuth,
  fetchAdmin,
  isCan("update", "Chapter"),
  async (req, res, next) => {
    try {
      req.body.id = req.params.id;
      const resault = await chapterServices.updateChapter(req.body);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//delete Chapter
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
