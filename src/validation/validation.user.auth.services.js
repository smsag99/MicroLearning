const joi = require("joi");

const signup = {
  body: joi.object().keys({
    phone: joi
      .string()
      .length(11)
      .regex(/^09\d{9}$/)
      .required(),
  }),
};

const verify = {
  body: joi.object().keys({
    phone: joi
      .string()
      .length(11)
      .regex(/^09\d{9}$/)
      .required(),
    code: joi
      .string()
      .regex(/^[0-9]+$/)
      .required(),
    password: joi
      .string()
      .regex(/^[a-zA-Z0-9]{8,16}$/)
      .required(),
  }),
};

const login = {
  body: joi.object().keys({
    phone: joi
      .string()
      .length(11)
      .regex(/^09\d{9}$/)
      .required(),
    password: joi
      .string()
      .regex(/^[a-zA-Z0-9]{8,16}$/)
      .required(),
  }),
};

const logout = {
  body: joi.object().keys({
    phone: joi
      .string()
      .length(11)
      .regex(/^09\d{9}$/)
      .required(),
  }),
};
const refreshToken = {
  body: joi.object().keys({
    RefreshToken: joi.string().required(),
  }),
};
const forgetPassword = {
  body: joi.object().keys({
    phone: joi
      .string()
      .length(11)
      .regex(/^09\d{9}$/)
      .required(),
  }),
};

const verifyForgetPassword = {
  body: joi.object().keys({
    phone: joi
      .string()
      .length(11)
      .regex(/^09\d{9}$/)
      .required(),
    code: joi
      .string()
      .regex(/^[0-9]+$/)
      .required(),
    password: joi
      .string()
      .regex(/^[a-zA-Z0-9]{8,16}$/)
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
