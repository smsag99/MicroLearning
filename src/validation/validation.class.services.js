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
    startTime: joi.date().optional(),
    endTime: joi.date().optional(),
    mentorId: joi.number().required(),
    courseId: joi.number().required(),
    capacity: joi.number().required(),
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
    startTime: joi.date().optional(),
    endTime: joi.date().optional(),
    mentorId: joi.number().optional(),
    courseId: joi.number().optional(),
    capacity: joi.number().optional(),
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
