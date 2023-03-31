/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
const { ApiError } = require("../api/middlewares/errorHandling.middleware");

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CheckIfCorrect, generateNewCodeForThisNumber } = require("./sms");
require("dotenv").config();

const prisma = new PrismaClient();

const signup = async (phone) => {
  const user = await getUserbyPhone(phone);
  if (user) {
    throw new ApiError(403, "This User Already Exists!");
  }
  await generateNewCodeForThisNumber(phone);
};

const verify = async (phone, code, password) => {
  console.log(code);
  if (await CheckIfCorrect(code, phone)) {
    return createUser(phone, password);
  }
  throw new ApiError(403, "access denied! code isn't correct");
};

const login = async (phone, password) => {
  const user = await getUserbyPhone(phone);
  if (!user) {
    throw new ApiError(404, "This User Doesn't Exists!");
  }
  if (await bcrypt.compare(password, user.password))
    return setRefereshToken(phone, password);
  throw new ApiError(403, "access denied! password is incorrect");
};
async function getAllUsers(size, page) {
  try {
    console.log(size, page);
    const users = await prisma.user.findMany({
      skip: size * (page - 1),
      take: size * 1,
    });
    return users;
  } catch (error) {
    console.log("errrror", error);
    return error;
  }
}
async function checkRefreshToken(receivedRefreshToken) {
  const userId = await jwt.verify(
    receivedRefreshToken,
    process.env.REFRESHTOKEN_SECRET
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
    user.refreshToken = "";
    await updateUser(user);
    return true;
  } catch (error) {
    throw new ApiError(404, "User not found");
  }
};

const forgetPassword = async (phone) => {
  await generateNewCodeForThisNumber(phone);
  return;
};

const verifyForgetPassword = async (phone, code, password) => {
  const user = await getUserbyPhone(phone);
  if (await CheckIfCorrect(code, phone)) {
    const hashedPaassword = await bcrypt.hash(password, 10);
    user.password = hashedPaassword;
    if (await updateUser(user)) await setRefereshToken(user.phone);
  } else {
    throw new ApiError(403, "access denied! code isn't correct");
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
    { expiresIn: 3600000 * 1000 }
  );
  const accesstoken = await jwt.sign(
    { id: user.id },
    process.env.ACCESSTOKEN_SECRET,
    { expiresIn: 3600000 }
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
    const user = await prisma.User.update({
      where: { phone },
      data: user,
    });
    return user;
  } catch (error) {
    throw new ApiError(500, "error while updating");
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
    return true;
  } catch (error) {
    throw new ApiError(500, "error while deleting");
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
