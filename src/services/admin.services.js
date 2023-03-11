const { PrismaClient } = require("@prisma/client");
const { CheckIfCorrect, generateNewCodeForThisNumber } = require("./sms.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();

const signup = async (req) => {};

function getAdminbyId(objectId) {}

async function getAdminbyUserName(userName) {}

async function setRefereshToken(userName) {}

async function createAdmin(userName, password) {}

async function updateUser(user) {}

function deleteUser(userName) {}

module.exports = { signup };
