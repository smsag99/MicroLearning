/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CheckIfCorrect, generateNewCodeForThisNumber } = require('./sms');
require('dotenv').config();

const prisma = new PrismaClient();

const signup = async (phone) => {
  const user = await getUserbyPhone(phone);
  if (user) {
    return 'This User Already Exists!';
  }
  await generateNewCodeForThisNumber(phone);
};

const verify = async (phone, code, password) => {
  if (await CheckIfCorrect(code, phone)) {
    return createUser(phone, password);
  }
  return "code isn't correct";
};

const login = async (phone, password) => {
  const user = await getUserbyPhone(phone);
  if (!user) {
    return 'password or username is incorrect';
  }
  if (await bcrypt.compare(password, user.password)) return setRefereshToken(phone, password);
  return 'password or username is incorrect';
};
async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    return error;
  }}
async function checkRefreshToken(receivedRefreshToken) {
  const userId = await jwt.verify(
    receivedRefreshToken,
    process.env.REFRESHTOKEN_SECRET,
  ).id;
  const admin = await getUserbyId(userId);
  if (receivedRefreshToken === admin.refreshToken) return userId;
}
const refreshToken = async (id) => {
  const user = await getUserbyId(id);
  return setRefereshToken(user.phone);
};

const logout = async (phone) => {
  try {
    const user = await getUserbyPhone(phone);
    user.refreshToken = '';
    await updateUser(user);
    return 'user loged out';
  } catch (error) {
    return false;
  }
};

const forgetPassword = async (phone) => {
  await generateNewCodeForThisNumber(phone);
  return 'new code has generated';
};

const verifyForgetPassword = async (phone, code, password) => {
  const user = await getUserbyPhone(phone);
  if (await CheckIfCorrect(code, phone)) {
    const hashedPaassword = await bcrypt.hash(password, 10);
    user.password = hashedPaassword;
    if (await updateUser(user)) return setRefereshToken(user.phone);
  } else {
    return "code isn't correct";
  }
};

async function getUserbyId(objectId) {
  return prisma.User.findUnique({
    where: {
      id: objectId,
    },
  });
}

async function getUserbyPhone(phone) {
  return prisma.User.findUnique({
    where: {
      phone,
    },
  });
}

async function setRefereshToken(phone) {
  const user = await getUserbyPhone(phone);
  const refreshtoken = jwt.sign(
    { id: user.id },
    process.env.REFRESHTOKEN_SECRET,
    { expiresIn: 3600000 * 1000 },
  );
  const accesstoken = await jwt.sign(
    { id: user.id },
    process.env.ACCESSTOKEN_SECRET,
    { expiresIn: 3600000 },
  );
  user.refreshToken = refreshtoken;
  if (await updateUser(user)) {
    return accesstoken;
  }
}

async function createUser(phone, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.User.create({
    data: {
      phone,
      password: hashedPassword,
    },
  });
  return setRefereshToken(phone);
}

async function updateUser(user) {
  try {
    const { phone } = user;
    // eslint-disable-next-line no-param-reassign
    delete user.id;
    await prisma.User.update({
      where: { phone },
      data: user,
    });
    return true;
  } catch (err) {
    return false;
  }
}

async function deleteUser(phone) {
  try {
    const deletedPhone = `D-${phone}`;
    await prisma.User.update({
      where: { phone },
      data: {
        phone: deletedPhone,
        softDelete: true,
      },
    });
    return 'user deleted';
  } catch (error) {
    return 'error';
  }
}

module.exports = {
  signup,
  verify,
  login,
  refreshToken,
  forgetPassword,
  verifyForgetPassword,
  logout,
  updateUser,
  getUserbyId,
  getAllUsers,
  getUserbyPhone,
  setRefereshToken,
  createUser,
  deleteUser,
  checkRefreshToken,
};
