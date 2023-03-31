/* eslint-disable no-use-before-define */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PROCESSING } = require("http-status-codes");
const { func } = require("joi");
const { CheckIfCorrect, generateNewCodeForThisNumber } = require("./sms");
const { getUserbyId } = require("./user.services");
const { ApiError } = require("../api/middlewares/errorHandling.middleware");
require("dotenv").config();

const prisma = new PrismaClient();

const signup = async (userName, password, permissions) => {
  const admin = await getAdminbyUserName(userName);
  console.log(admin);
  if (admin) {
    throw new ApiError(403, "This Admin Already Exists!");
  }
  return await createAdmin(userName, password, permissions);
};

const login = async (userName, password) => {
  const admin = await getAdminbyUserName(userName);
  console.log(admin);
  if (!admin) {
    throw new ApiError(404, "This admin Doesn't Exists!");
  }
  if (await bcrypt.compare(password, admin.password)) {
    return await setRefereshToken(userName);
  }
  throw new ApiError(403, "access denied! password is incorrect");
};

const refreshToken = async (id) => {
  const admin = await getAdminbyId(id);
  return await setRefereshToken(admin.userName);
};

const logout = async (userName) => {
  try {
    const admin = await getAdminbyUserName(userName);
    admin.refreshToken = "";
    await updateAdmin(admin);
  } catch (error) {
    throw new ApiError(404, "Admin not found");
  }
};

async function getAdminbyId(objectId) {
  return await prisma.Admin.findUnique({
    where: {
      id: objectId,
    },
  });
}

async function getAdminbyUserName(userName) {
  console.log("getadmin by username", userName);
  try {
    return await prisma.Admin.findUnique({
      where: {
        userName,
      },
    });
  } catch (error) {
    throw new ApiError(500, "database error while findUnique");
  }
}
async function checkRefreshToken(receivedRefreshToken) {
  const adminId = await jwt.verify(
    receivedRefreshToken,
    process.env.REFRESHTOKEN_SECRET
  ).id;
  const admin = await getAdminbyId(adminId);
  if (receivedRefreshToken == admin.refreshToken) return admin.id;
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
      userName,
      password: hashedPassword,
      permissions: permissionsString,
    },
  });
  return await setRefereshToken(userName);
}

async function updateAdmin(admin) {
  try {
    delete admin.id;
    const resault = await prisma.Admin.update({
      where: { userName: admin.userName },
      data: admin,
    });
    console.log(resault);
    return resault;
  } catch (error) {
    throw new ApiError(500, "error while updating");
  }
}

async function deleteAdmin(userName) {
  try {
    const deletedUserName = `D-${userName}`;
    await prisma.Admin.update({
      where: { userName },
      data: {
        userName: deletedUserName,
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
  checkRefreshToken,
};
