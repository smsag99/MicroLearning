const joi = require("joi");
const read = {
  body: joi.object().keys({
    phone: joi
      .string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
  }),
};
const create = {
  body: joi.object().keys({
    firstName: joi.string().optional(),
    lastName: joi.string().optional(),
    phone: joi
      .string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,16}$"))
      .required(),
    blocked: joi.bool().optional(),
    softDelete: joi.bool().optional(),
    countryCode: joi.string().optional(),
    addresses: joi.array().items(
      joi.object({
        province: joi.string().optional(),
        city: joi.string().optional(),
        address: joi.string().optional(),
      }).optional
    ),
  }),
};

const update = {
  body: joi.object().keys({
    firstName: joi.string().optional(),
    lastName: joi.string().optional(),
    phone: joi
      .string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,16}$"))
      .optional,
    blocked: joi.bool().optional(),
    softDelete: joi.bool().optional(),
    countryCode: joi.string().optional(),
    addresses: joi.array().items(
      joi.object({
        province: joi.string().optional(),
        city: joi.string().optional(),
        address: joi.string().optional(),
      }).optional
    ),
  }),
};

module.exports = {
  read,
  create,
  update,
};
