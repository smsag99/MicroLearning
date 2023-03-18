const { PrismaClient } = require("@prisma/client");
const { CheckIfCorrect, generateNewCodeForThisNumber } = require("./sms.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PROCESSING } = require("http-status-codes");
require("dotenv").config();

const prisma = new PrismaClient();

const signup = async (req) => {
  const { userName, password } = req.body;
  const admin = await getAdminbyUserName(userName);
  if (admin) {
    return "This admin Already Exists!";
  } else {
    return await createAdmin(userName, password, "[]");
  }
};

const login = async (req) => {
  const { userName, password } = req.body;
  const admin = await getAdminbyUserName(userName);
  if (!admin) {
    return "This admin Doesn't Exists!";
  } else {
    if (await bcrypt.compare(password, admin.password))
      return await setRefereshToken(userName, password);
    return "password is incorrect";
  }
};

const refreshToken = async (req) => {
  const { userName } = req.body;
  const admin = await getAdminbyUserName(userName);
  await setRefereshToken(admin);
};

const logout = async (req) => {
  const { userName } = req.body;
  const admin = await getAdminbyUserName(userName);
  admin.refreshToken = "";
  await updateAdmin(admin);
};

async function getAdminbyId(objectId) {
  return await prisma.Admin.findUnique({
    where: {
      id: objectId,
    },
  });
}

async function getAdminbyUserName(userName) {
  console.log(userName);
  try {
    return await prisma.Admin.findUnique({
      where: {
        userName: userName,
      },
    });
  } catch (error) {
    return error;
  }
}

async function setRefereshToken(userName) {
  const admin = await getAdminbyUserName(userName);
  const refreshToken = await jwt.sign(
    { id: admin.id },
    process.env.REFRESHTOKEN_SECRET,
    { expiresIn: 3600000 * 1000 }
  );
  const accessToken = await jwt.sign(
    { id: admin.id },
    process.env.ACCESSTOKEN_SECRET,
    { expiresIn: 3600000 }
  );
  admin.refreshToken = refreshToken;
  if (await updateAdmin(admin)) {
    return accessToken;
  }
}

async function createAdmin(userName, password, permissions) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const permissionsString = JSON.stringify(permissions);
  const admin = await prisma.Admin.create({
    data: {
      userName: userName,
      password: hashedPassword,
      permissions: permissionsString,
    },
  });
  return await setRefereshToken(userName);
}

async function updateAdmin(admin) {
  try {
    delete admin.id;
    await prisma.Admin.update({
      where: { userName: admin.userName },
      data: admin,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function deleteAdmin(userName) {
  try {
    const deletedUserName = "D-" + userName;
    await prisma.Admin.update({
      where: { userName: userName },
      data: {
        userName: deletedUserName,
        softDelete: true,
      },
    });
    return "admin deleted";
  } catch (error) {
    return "error";
  }
}

module.exports = {
  signup,
  login,
  refreshToken,
  logout,
  getAdminbyId,
  updateAdmin,
  getAdminbyId,
  getAdminbyUserName,
  setRefereshToken,
  createAdmin,
  deleteAdmin,
};
