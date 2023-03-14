require("dotenv").config();
const { getAdminbyId } = require("../../services/admin.services.js");

const fetchAdmin = async (req, res, next) => {
  try {
    req.user = await getAdminbyId(req.user.id);
    next();
  } catch (err) {
    res.send("admin not found!");
  }
};

module.exports = { fetchAdmin };
