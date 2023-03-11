const { PrismaClient } = require("@prisma/client");
const { CheckIfCorrect, generateNewCodeForThisNumber } = require("./sms.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();

const signup = async (req) => {
  const { phone } = req.body;
  const user = await getUserbyPhone(phone);
  if (user) {
    return "This User Already Exists!";
  }
  await generateNewCodeForThisNumber(phone);
};

const verify = async (req) => {
  const { phone, code, password } = req.body;
  if (await CheckIfCorrect(code, phone)) {
    return createUser(phone, password);
    //return "code is correct and user is created";
  } else {
    return "code isn't correct";
  }
};

function getUserbyId(objectId) {}

async function getUserbyPhone(phone) {
  return await prisma.User.findUnique({
    where: {
      phoneNumber: phone,
    },
  });
}

async function setRefereshToken(phone) {
  const user = await getUserbyPhone(phone);
  //console.log(user);
  const refreshToken = await jwt.sign(
    { objectId: user.objectId, phone: phone },
    "12345678",
    { expiresIn: 3600000 * 1000 }
  );
  const accessToken = await jwt.sign(
    { objectId: user.objectId, phone: phone },
    "12345678",
    { expiresIn: 3600000 }
  );
  if (await updateUser({ phone, refreshToken })) {
    return accessToken;
  }
}

async function createUser(phone, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.User.create({
    data: {
      phoneNumber: phone,
      password: hashedPassword,
    },
  });
  return await setRefereshToken(phone);
}

async function updateUser(user) {
  try {
    const { phone } = user;
    //console.log(phone);
    await prisma.User.update({
      where: { phoneNumber: phone },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        countryCode: user.countryCode,
        password: user.password,
        refreshToken: user.refreshToken,
        blocked: user.blocked,
        isAllowedtoResetPassword: user.isAllowedtoResetPassword,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}

function deleteUser(phone) {}

module.exports = { signup, verify };
