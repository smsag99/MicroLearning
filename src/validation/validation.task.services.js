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
    chapterId: joi.number().required(),
    priority: joi.number().optional(),
    timeToRead: joi.number().optional(),
    content: joi.any().optional(),
    type: joi
      .string()
      .valid(...["task", "quiz"])
      .required(),
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
    chapterId: joi.number().optional(),
    priority: joi.number().optional(),
    timeToRead: joi.number().optional(),
    content: joi.any().optional(),
    type: joi
      .string()
      .valid(...["task", "quiz"])
      .optional(),
  }),
};
module.exports = {
  read,
  create,
  update,
};
