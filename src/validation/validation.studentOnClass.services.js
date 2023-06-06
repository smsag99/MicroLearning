/* eslint-disable no-dupe-keys */
const { number } = require("joi");
const joi = require("joi");

const readAllStudent = {
  params: joi.object().keys({
    classID: joi.number().required(),
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
    studentId: joi.number().required(),
    classId: joi.number().required(),
    mark: joi.number().optional(),
    progress: joi.number().precision(2).strict().optional(),
    startTime: joi.date().optional(),
    endTime: joi.date().optional(),
  }),
};

const update = {
  body: joi.object().keys({
    studentId: joi.number().required(),
    classId: joi.number().optional(),
    mark: joi.number().optional(),
    progress: joi.number().precision(2).strict().optional(),
    startTime: joi.date().optional(),
    endTime: joi.date().optional(),
  }),
};
module.exports = {
  readAllStudent,
  readStudentOnClass,
  create,
  update,
};
