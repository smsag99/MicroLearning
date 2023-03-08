const expressLoader = require("./express.js");

const loader = async (app) => {
  await expressLoader(app);
};

module.exports = loader;
