require("dotenv").config();
const { getAdminbyId } = require("../../services/admin.services");
const { ApiError } = require("./errorHandling.middleware");

const fetchAdmin = async (req, res, next) => {
  try {
    console.log(req.user.id);
    req.user = await getAdminbyId(req.user.id);
    console.log("fetched");
    console.log(req.user.permissions);
    next();
  } catch (err) {
    return next (new ApiError(401, "admin not found!"));
  }
};

module.exports = { fetchAdmin };
