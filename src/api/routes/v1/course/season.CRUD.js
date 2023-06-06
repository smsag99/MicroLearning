const express = require("express");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const crudSeasonValidationSchema = require("../../../../validation/validation.season.services");
const validate = require("../../../middlewares/validate.middleware");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");
const seasonServices = require("../../../../services/course/season services");

//get all Seasons
router.get(
  "/getAllSeasons",
  isAuth,
  fetchAdmin,
  // isCan("read", "Season"),
  async (req, res, next) => {
    try {
      const resault = await seasonServices.getAllSeasons();
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

//get season by Id
router.get(
  "/:id",
  validate(crudSeasonValidationSchema.read),
  isAuth,
  fetchAdmin,
  // isCan("read", "Season"),
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

//get season of course by courseId
router.get(
  "/getSeasonsOfCourse/:id",
  validate(crudSeasonValidationSchema.read),
  isAuth,
  fetchAdmin,
  // isCan("read", "Season"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const resault = await seasonServices.getSeasonsOfCourse(id);
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);

//create season
router.post(
  "/",
  validate(crudSeasonValidationSchema.create),
  isAuth,
  fetchAdmin,
  isCan("create", "Season"),
  async (req, res, next) => {
    try {
      const { title, courseId, priority } = req.body;
      const resault = await seasonServices.createEmptySeason(
        title,
        courseId,
        priority
      );
      res.send(resault);
    } catch (error) {
      return next(new ApiError(error.statusCode, error.message));
    }
  }
);
//put season
router.put(
  "/",
  validate(crudSeasonValidationSchema.update),
  isAuth,
  fetchAdmin,
  isCan("update", "Season"),
  async (req, res, next) => {
    try {
      req.body.id = req.params.id;
      const resault = await seasonServices.updateSeason(req.body);
      res.send(resault);
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
