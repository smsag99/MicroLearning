const joi = require("joi");

const signup = {
  body: joi.object().keys({
    userName: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{5,16}$"))
      .required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,16}$"))
      .required(),
  }),
};
const login = {
  body: joi.object().keys({
    userName: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{5,16}$"))
      .required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,16}$"))
      .required(),
  }),
};
const refreshToken = {
  body: joi.object().keys({
    userName: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{5,16}$"))
      .required(),
  }),
};
const logout = {
  body: joi.object().keys({
    userName: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{5,16}$"))
      .required(),
  }),
};
module.exports = {
  signup,
  login,
  logout,
  refreshToken,
};
