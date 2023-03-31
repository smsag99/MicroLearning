const expressLoader = require("./express");

const loader = async (app) => {
  await expressLoader(app);
};

module.exports = loader;
