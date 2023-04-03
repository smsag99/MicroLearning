/* eslint-disable no-dupe-keys */
const joi = require("joi");

const read = {
  params: joi.object().keys({
    userName: joi
      .string()
      .regex(/^[a-zA-Z0-9]{5,16}$/)
      .required(),
  }),
};
const create = {
  body: joi.object().keys({
    userName: joi
      .string()
      .regex(/^[a-zA-Z0-9]{5,16}$/)
      .required(),
    firstName: joi.string().optional(),
    lastName: joi.string().optional(),
    softDelete: joi.bool().optional(),
    password: joi
      .string()
      .regex(/^[a-zA-Z0-9]{8,16}$/)
      .required(),
    permissions: joi.array().items(
      joi.object({
        action: joi
          .string()
          .valid(...["create", "read", "update", "delete"])
          .required(),
        subject: joi
          .string()
          .valid(...["Admin", "User"])
          .required(),
      })
    ),
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
      .regex(/^[a-zA-Z0-9]{5,16}$/)
      .required(),
  }),
  body: joi.object().keys({
    password: joi
      .string()
      .regex(/^[a-zA-Z0-9]{8,16}$/)
      .required(),
    permissions: joi
      .array()
      .items(
        joi.object({
          action: joi
            .string()
            .valid(...["create", "read", "update", "delete"])
            .required(),
          subject: joi
            .string()
            .valid(...["Admin", "User"])
            .required(),
        })
      )
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
