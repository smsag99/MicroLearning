const express = require("express");
const { signup } = require("../../../../services/admin.services.js");
const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const resault = await signup(req);
    return res.send(resault);
  } catch (error) {
    return next(error);
  }
});
module.exports = router;
