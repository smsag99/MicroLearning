const express = require('express');
const { signup, verify } = require('../../../services/user.services');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const resault = await signup(req);
    return res.send(resault);
  } catch (error) {
    return next(error);
  }
});
router.post('/verify', async (req, res, next) => {
  try {
    const resault = await verify(req);
    return res.send(resault);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
