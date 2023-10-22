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
        if (err || !file.media) {
          reject(err || new Error("media is not provided."));
          return;
        }

        const extention = file.media.originalFilename.split(".");
        const newPath = path.join(
          process.cwd(),
          "src/",
          directory,
          uuid.v4() + "_." + extention[extention.length - 1]
        );
        const pathToFile = newPath.split(path.sep);
        fs.createReadStream(file.media.filepath)
          .pipe(fs.createWriteStream(newPath))
          .on("finish", () =>
            resolve(
              `http://82.115.18.249:3000/${pathToFile[pathToFile.length - 1]}`
            )
          )
          .on("error", (error) => reject(error));
      });
    });
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};
