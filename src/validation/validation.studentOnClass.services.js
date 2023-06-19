/* eslint-disable no-dupe-keys */
const { number } = require("joi");
const joi = require("joi");

const read = {
  params: joi.object().keys({
    id: joi.number().required(),
  }),
};
const readStudentOnClass = {
  params: joi.object().keys({
    userID: joi.number().required(),
    classID: joi.number().required(),
  }),
};
const create = {
  body: joi.object().keys({
    userId: joi.number().required(),
    classId: joi.number().required(),
    mark: joi.number().optional(),
    progress: joi.number().precision(2).strict().optional(),
    startTime: joi.date().optional().default("2022-01-01T00:00:00.000Z"),
    endTime: joi.date().optional().default("2027-01-01T00:00:00.000Z"),
  }),
};

const update = {
  params: joi.object().keys({
    userId: joi.number().required(),
    classId: joi.number().required(),
  }),
  body: joi.object().keys({
    mark: joi.number().optional(),
    progress: joi.number().precision(2).strict().optional(),
    startTime: joi.date().optional(),
    endTime: joi.date().optional(),
  }),
};
const updateDone = {
  params: joi.object().keys({
    userId: joi.number().required(),
    classId: joi.number().required(),
    taskId: joi.number().required(),
  }),
};
module.exports = {
  read,
  readStudentOnClass,
  create,
  update,
  updateDone,
};
