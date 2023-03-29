const express = require('express');
const authUserV1 = require('./user/auth');
const authAdminV1 = require('./admin/auth');

const v1Loader = () => {
  const router = express.Router();
  router.use('/authUser', authUserV1);
  router.use('/authAdmin', authAdminV1);
  return router;
};
module.exports = v1Loader;
