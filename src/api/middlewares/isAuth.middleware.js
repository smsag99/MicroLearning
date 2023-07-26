/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const { ApiError } = require("./errorHandling.middleware");
require("dotenv").config();

const isAuth = async (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return next(new ApiError(411, "access denied! token not available!"));
  }
  try {
    await jwt.verify(
      token,
      process.env.ACCESSTOKEN_SECRET,
      (error, decoded) => {
        if (error) {
          return next(new ApiError(413, "access denied! invalid token!"));
        }
        req.user = decoded;
        req.client = decoded;
        console.log("auth");
        next();
      }
    );
  } catch (error) {
    return next(new ApiError(411, "access denied! invalid token!"));
  }
};
module.exports = { isAuth };
