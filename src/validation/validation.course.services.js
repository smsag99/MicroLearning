/* eslint-disable no-dupe-keys */
const { number } = require("joi");
const joi = require("joi");

const read = {
  params: joi.object().keys({
    id: joi.number().required(),
  }),
};
const create = {
  body: joi.object().keys({
    title: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{5,16}$/)
      .required(),
    teacherId: joi.number().required(),
    description: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{1,200}$/)
      .optional(),
  }),
};

const update = {
  params: joi.object().keys({
    id: joi.number().required(),
  }),
  body: joi.object().keys({
    title: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{5,16}$/)
      .optional(),
    teacherId: joi.number().optional(),
    description: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{1,200}$/)
      .optional(),
  }),
};
const lock = {
  params: joi.object().keys({
    id: joi.number().required(),
  }),
  body: joi.object().keys({
    lockStatus: joi.bool().required(),
  }),
};
module.exports = {
  read,
  create,
  update,
  lock,
};
