const { createMongoAbility, ForbiddenError } = require('@casl/ability');

const isCan = (action, adminSubject) => (req, res, next) => {
  const ability = createMongoAbility(JSON.parse(req.user.permissions));
  ForbiddenError.from(ability).throwUnlessCan(action, adminSubject);
  return next();
};

module.exports = { isCan };
