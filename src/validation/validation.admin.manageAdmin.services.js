/* eslint-disable no-dupe-keys */
const joi = require("joi");

const read = {
  params: joi.object().keys({
    userName: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{5,16}$/)
      .required(),
  }),
};
const create = {
  body: joi.object().keys({
    userName: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{5,16}$/)
      .required(),
    softDelete: joi.bool().optional(),
    profilePhoto: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{5,50}$/)
      .optional(),
    password: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{8,16}$/)
      .required(),
    role: joi
      .string()
      .valid(...["Admin", "Teacher", "Supervisor"])
      .required(),
    firstName: joi
      .string()
      .regex(/^[a-zA-Z]{3,16}$/)
      .optional(),
    lastName: joi
      .string()
      .regex(/^[a-zA-Z]{3,16}$/)
      .optional(),
  }),
};

const update = {
  params: joi.object().keys({
    userName: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{5,16}$/)
      .required(),
  }),
  body: joi.object().keys({
    password: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{8,16}$/)
      .optional(),
    profilePhoto: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{5,50}$/)
      .optional(),
    role: joi
      .string()
      .valid(...["Admin", "Teacher", "Supervisor"])
      .optional(),
    firstName: joi
      .string()
      .regex(/^[a-zA-Z]{3,16}$/)
      .optional(),
    lastName: joi
      .string()
      .regex(/^[a-zA-Z]{3,16}$/)
      .optional(),
  }),
};

module.exports = {
  read,
  create,
  update,
};
