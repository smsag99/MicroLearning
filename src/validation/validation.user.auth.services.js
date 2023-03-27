const joi = require("joi");

const signup = {
  body: joi.object().keys({
    phone: joi
      .string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
  }),
};

const verify = {
  body: joi.object().keys({
    phone: joi
      .string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    code: joi
      .string()
      .pattern(/^[0-9]+$/)
      .required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,16}$"))
      .required(),
  }),
};

const login = {
  body: joi.object().keys({
    phone: joi
      .string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,16}$"))
      .required(),
  }),
};

const logout = {
  body: joi.object().keys({
    phone: joi
      .string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
  }),
};
const refreshToken = {
  body: joi.object().keys({
    receivedRefreshToken: joi.string().required(),
  }),
};
const forgetPassword = {
  body: joi.object().keys({
    phone: joi
      .string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
  }),
};

const verifyForgetPassword = {
  body: joi.object().keys({
    phone: joi
      .string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    code: joi
      .string()
      .pattern(/^[0-9]+$/)
      .required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,16}$"))
      .required(),
  }),
};

module.exports = {
  signup,
  verify,
  login,
  logout,
  refreshToken,
  forgetPassword,
  verifyForgetPassword,
};
