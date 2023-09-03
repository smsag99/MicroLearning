const joi = require("joi");

const signup = {
  body: joi.object().keys({
    userName: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{5,16}$/)
      .required(),
    password: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{8,16}$/)
      .required(),
    profilePhoto: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{5,50}$/)
      .optional(),
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
    permissions: joi.array().items(
      joi.object({
        action: joi
          .string()
          .valid(...["create", "read", "update", "delete"])
          .required(),
        subject: joi
          .string()
          .valid(
            ...[
              "Admin",
              "User",
              "Course",
              "Class",
              "Chapter",
              "Task",
              "Season",
              "StudentOnClass",
            ]
          )
          .optional(),
      })
    ),
  }),
};
const login = {
  body: joi.object().keys({
    userName: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{5,16}$/)
      .required(),
    password: joi
      .string()
      .regex(/^[a-zA-Z0-9- ]{8,16}$/)
      .required(),
  }),
};
const refreshToken = {
  body: joi.object().keys({
    RefreshToken: joi.string().required(),
  }),
};
// const logout = {
//   body: joi.object().keys({
//     userName: joi
//       .string()
//       .regex(/^[a-zA-Z0-9- ]{5,16}$/)
//       .required(),
//   }),
// };
module.exports = {
  signup,
  login,
  //logout,
  refreshToken,
};
