require("dotenv").config();
const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    res.send("no token found");
  }
  try {
    let user = await JWT.verify(token, process.env.ACCESSTOKEN_SECRET);
    req.id = user.id;
    req.userName = user.userName;
    console.log(req.userName);
    next();
  } catch (e) {
    res.send("token invalid");
  }
};
