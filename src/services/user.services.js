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
  } else {
    return "code isn't correct";
  }
};

const login = async (req) => {
  const { phone, password } = req.body;
  const user = await getUserbyPhone(phone);
  if (!user) {
    return "This User Doesn't Exists!";
  } else {
    if (await bcrypt.compare(password, user.password))
      return await setRefereshToken(phone, password);
    return "password is incorrect";
  }
};

const refreshToken = async (req) => {
  const { phone } = req.body;
  const user = await user(phone);
  await setRefereshToken(user);
};

const logout = async (req) => {
  try {
    const { phone } = req.body;
    const user = await getUserbyPhone(phone);
    user.refreshToken = "";
    await updateUser(user);
    return "user loged out";
  } catch (error) {
    return false;
  }
};

const forgetPassword = async (req) => {
  const { phone } = req.body;
  await generateNewCodeForThisNumber(phone);
  return "new code has generated";
};

const verifyForgetPassword = async (req) => {
  const { phone, code, password } = req.body;
  const user = await getUserbyPhone(phone);
  if (await CheckIfCorrect(code, phone)) {
    const hashedPaassword = await bcrypt.hash(password, 10);
    user.password = hashedPaassword;
    if (await updateUser(user)) return await setRefereshToken(user.phone);
  } else {
    return "code isn't correct";
  }
};

async function getUserbyId(objectId) {
  return await prisma.User.findUnique({
    where: {
      id: objectId,
    },
  });
}

async function getUserbyPhone(phone) {
  return await prisma.User.findUnique({
    where: {
      phone: phone,
    },
  });
}

async function setRefereshToken(phone) {
  const user = await getUserbyPhone(phone);
  const refreshToken = await jwt.sign(
    { id: user.id },
    process.env.REFRESHTOKEN_SECRET,
    { expiresIn: 3600000 * 1000 }
  );
  const accessToken = await jwt.sign(
    { id: user.id },
    process.env.ACCESSTOKEN_SECRET,
    { expiresIn: 3600000 }
  );
  user.refreshToken = refreshToken;
  if (await updateUser(user)) {
    return accessToken;
  }
}

async function createUser(phone, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.User.create({
    data: {
      phone: phone,
      password: hashedPassword,
    },
  });
  return await setRefereshToken(phone);
}

async function updateUser(user) {
  try {
    const { phone } = user;
    delete user.id;
    await prisma.User.update({
      where: { phone: phone },
      data: user,
    });
    return true;
  } catch (err) {
    return false;
  }
}

async function deleteUser(phone) {
  try {
    const deletedPhone = "D-" + phone;
    await prisma.User.update({
      where: { phone: phone },
      data: {
        phone: deletedPhone,
        softDelete: true,
      },
    });
    return "user deleted";
  } catch (error) {
    return "error";
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
  getUserbyPhone,
  setRefereshToken,
  createUser,
  deleteUser,
};
