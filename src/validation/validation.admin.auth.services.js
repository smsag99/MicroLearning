const joi = require('joi');

const signup = {
  body: joi.object().keys({
    userName: joi
      .string()
      .pattern(/^[a-zA-Z0-9]{5,16}$/)
      .required(),
    password: joi
      .string()
      .pattern(/^[a-zA-Z0-9]{8,16}$/)
      .required(),
    permissions: joi.array().items(
      joi.object({
        action: joi
          .string()
          .valid(...['create', 'read', 'update', 'delete'])
          .required(),
        subject: joi
          .string()
          .valid(...['Admin', 'User'])
          .required(),
      }),
    ),
  }),
};
const login = {
  body: joi.object().keys({
    userName: joi
      .string()
      .pattern(/^[a-zA-Z0-9]{5,16}$/)
      .required(),
    password: joi
      .string()
      .pattern(/^[a-zA-Z0-9]{8,16}$/)
      .required(),
  }),
};
const refreshToken = {
  body: joi.object().keys({
    receivedRefreshToken: joi.string().required(),
  }),
};
const logout = {
  body: joi.object().keys({
    userName: joi
      .string()
      .pattern(/^[a-zA-Z0-9]{5,16}$/)
      .required(),
  }),
};
module.exports = {
  signup,
  login,
  logout,
  refreshToken,
};
