/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuth = async (req, res, next) => {
  const token = req.headers['access-token'];
  if (!token) {
    return res.send('token not available!');
  }
  try {
    const decoded = await jwt.verify(token, process.env.ACCESSTOKEN_SECRET);
    req.user = decoded;
    console.log('auth');
    next();
  } catch (error) {
    return res.send('invalid token!');
  }
};
module.exports = { isAuth };
