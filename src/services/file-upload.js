const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const formidable = require("formidable");
const {
  ApiError,
} = require("../../src/api/middlewares/errorHandling.middleware");

module.exports = (req, directory) => {
  try {
    return new Promise((resolve, reject) => {
      const form = formidable({ multiples: false });
      form.parse(req, (err, fields, file) => {
        if (err || !file.media)
          reject(err || new Error("media is not provided."));

        const newPath = path.join(
          process.cwd(),
          directory,
          uuid.v4() + "_" + file.media.originalFilename
        );

        fs.createReadStream(file.media.filepath)
          .pipe(fs.createWriteStream(newPath))
          .on("finish", () => resolve(newPath.split("\\")))
          .on("error", (error) => reject(error));
      });
    });
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};
