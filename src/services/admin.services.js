/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const prisma = new PrismaClient();

const signup = async (userName, password, permissions) => {
  const admin = await getAdminbyUserName(userName);
  console.log(admin);
  if (admin) {
    return 'This admin Already Exists!';
  }
  return createAdmin(userName, password, permissions);
};

const login = async (userName, password) => {
  const admin = await getAdminbyUserName(userName);
  console.log(admin);
  if (!admin) {
    return "This admin Doesn't Exists!";
  }
  if (await bcrypt.compare(password, admin.password)) { return setRefereshToken(userName); }
  return 'password is incorrect';
};

const refreshToken = async (id) => {
  const admin = await getAdminbyId(id);
  return setRefereshToken(admin.userName);
};

const logout = async (userName) => {
  try {
    const admin = await getAdminbyUserName(userName);
    admin.refreshToken = '';
    await updateAdmin(admin);
  } catch (error) {
    return 'Admin not found';
  }
};

async function getAdminbyId(objectId) {
  return prisma.Admin.findUnique({
    where: {
      id: objectId,
    },
  });
}

async function getAdminbyUserName(userName) {
  console.log('getadmin by username', userName);
  try {
    return await prisma.Admin.findUnique({
      where: {
        userName,
      },
    });
  } catch (error) {
    return error;
  }
}
async function getAlladmins() {
  try {
    const adminRecords = await prisma.admin.findMany({
      where: {
        role: 'admin',
      },
    });
    return adminRecords;
  } catch (error) {
    return error;
  }
}
async function checkRefreshToken(receivedRefreshToken) {
  const adminId = await jwt.verify(
    receivedRefreshToken,
    process.env.REFRESHTOKEN_SECRET,
  ).id;
  const admin = await getAdminbyId(adminId);
  if (receivedRefreshToken === admin.refreshToken) return admin.id;
}
async function setRefereshToken(userName) {
  const admin = await getAdminbyUserName(userName);
  const refreshtoken = await jwt.sign(
    { id: admin.id },
    process.env.REFRESHTOKEN_SECRET,
    { expiresIn: 3600000 * 1000 },
  );
  const accessToken = await jwt.sign(
    { id: admin.id },
    process.env.ACCESSTOKEN_SECRET,
    { expiresIn: 3600000 },
  );
  admin.refreshToken = refreshtoken;
  if (await updateAdmin(admin)) {
    return accessToken;
  }
}

async function createAdmin(userName, password, permissions) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const permissionsString = JSON.stringify(permissions);
  await prisma.Admin.create({
    data: {
      userName,
      password: hashedPassword,
      permissions: permissionsString,
    },
  });
  return setRefereshToken(userName);
}

async function updateAdmin(admin) {
  try {
    // eslint-disable-next-line no-param-reassign
    delete admin.id;
    const resault = await prisma.Admin.update({
      where: { userName: admin.userName },
      data: admin,
    });
    console.log(resault);
    return true;
  } catch (err) {
    return false;
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
    return 'admin deleted';
  } catch (error) {
    return 'error';
  }
}

module.exports = {
  signup,
  login,
  refreshToken,
  logout,
  getAdminbyId,
  updateAdmin,
  getAdminbyUserName,
  getAlladmins,
  setRefereshToken,
  createAdmin,
  deleteAdmin,
  checkRefreshToken,
};
