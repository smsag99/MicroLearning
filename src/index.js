const express = require("express");
const loader = require("./loader/index.js");

const app = new express();

async function startServer() {
  await loader(app);
}

startServer();
