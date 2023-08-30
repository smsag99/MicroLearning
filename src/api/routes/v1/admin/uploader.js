const express = require("express");
const router = express.Router();
const { isAuth } = require("../../../middlewares/isAuth.middleware");
const { isCan } = require("../../../middlewares/isCan.middleware");
const { fetchAdmin } = require("../../../middlewares/fetchAdmin.middleware");
const { ApiError } = require("../../../middlewares/errorHandling.middleware");
const uploader = require("../../../../services/file-upload");

//uploader media
router.post(
  "/",
  isAuth,
  fetchAdmin,
  isCan("create", "Task"),
  (req, res, next) => {
    uploader(req, "media")
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        return next(new ApiError(400, error.message));
      });
  }
);

module.exports = router;
