/* eslint-disable no-dupe-keys */
const joi = require('joi');

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
    softDelete: joi.bool().optional(),
    password: joi
      .string()
      .regex(/^[a-zA-Z0-9]{8,16}$/)
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
    role : joi.string().valid(...['teacher', 'admin', 'supervisor']).optional(),
    firstName: joi.string().regex(/^[a-zA-Z]{3,16}$/).optional(),
    lastName: joi.string().regex(/^[a-zA-Z]{3,16}$/).optional(),
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
      }).optional(),
    ),
    firstName: joi.string().regex(/^[a-zA-Z]{3,16}$/).optional(),
    lastName: joi.string().regex(/^[a-zA-Z]{3,16}$/).optional(),
    role : joi.string().valid(...['teacher', 'admin', 'supervisor']).optional(),
  }),
};
module.exports = {
  read,
  create,
  update,
};
