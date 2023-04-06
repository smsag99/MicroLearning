const express = require("express");
const course = require("./course.CRUD");
const season = require("./season.CRUD");
const chapter = require("./chapter.CRUD");
const task = require("./task.CRUD");

const courseLoader = () => {
  const router = express.Router();
  router.use("/", course);
  router.use("/season", season);
  router.use("/chapter", chapter);
  router.use("/task", task);

  return router;
};

module.exports = courseLoader;
