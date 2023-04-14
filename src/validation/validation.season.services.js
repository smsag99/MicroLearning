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
      .regex(/^[a-zA-Z0-9]{5,16}$/)
      .required(),
    courseId: joi.number().required(),
    priority: joi.number().required(),
  }),
};

const update = {
  params: joi.object().keys({
    id: joi.number().required(),
  }),
  body: joi.object().keys({
    title: joi
      .string()
      .regex(/^[a-zA-Z0-9]{5,16}$/)
      .optional(),
    courseId: joi.number().optional(),
    priority: joi.number().optional(),
  }),
};
module.exports = {
  read,
  create,
  update,
};
