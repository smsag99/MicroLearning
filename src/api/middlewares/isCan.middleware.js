const { createMongoAbility, ForbiddenError } = require("@casl/ability");
const { ApiError } = require("./errorHandling.middleware");

const isCan = (action, adminSubject) => async (req, res, next) => {
  try {
    const ability = createMongoAbility(JSON.parse(req.user.permissions));
    await ForbiddenError.from(ability).throwUnlessCan(action, adminSubject);
    return next();
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};

module.exports = { isCan };
