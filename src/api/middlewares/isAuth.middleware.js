/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const { ApiError } = require("./errorHandling.middleware");
require("dotenv").config();

const isAuth = async (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    throw new ApiError(403, "access denied! token not available!");
  }
  try {
    const decoded = await jwt.verify(token, process.env.ACCESSTOKEN_SECRET);
    req.user = decoded;
    console.log("auth");
    next();
  } catch (error) {
    throw new ApiError(403, "access denied! invalid token!");
  }
};
module.exports = { isAuth };
