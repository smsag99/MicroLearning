const { PrismaClient } = require("@prisma/client");
const { CheckIfCorrect, generateNewCodeForThisNumber } = require("./sms.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();

const signup = async (req) => {
  const { userName, password } = req.body;
  const admin = await getAdminbyUserName(userName);
  if (admin) {
    return "This admin Already Exists!";
  } else {
    await createAdmin(userName, password);
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
  console.log(userName);
  return await prisma.Admin.findUnique({
    where: {
      userName: userName,
    },
  });
}

async function setRefereshToken(userName) {
  const admin = await getAdminbyUserName(userName);
  console.log(admin);
  const refreshToken = await jwt.sign(
    { objectId: admin.objectId, userName: userName },
    "12345678",
    { expiresIn: 3600000 * 1000 }
  );
  const accessToken = await jwt.sign(
    { objectId: admin.objectId, userName: userName },
    "12345678",
    { expiresIn: 3600000 }
  );
  if (await updateAdmin({ userName, refreshToken })) {
    return accessToken;
  }
}

async function createAdmin(userName, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.Admin.create({
    data: {
      userName: userName,
      password: hashedPassword,
    },
  });
  return await setRefereshToken(userName);
}

async function updateAdmin(admin) {
  try {
    const { userName } = admin;
    //console.log(phone);
    await prisma.Admin.update({
      where: { userName: userName },
      data: {
        firstName: admin.firstName,
        lastName: admin.lastName,
        password: admin.password,
        refreshToken: admin.refreshToken,
        permissions: admin.permissions,
        isAllowedtoResetPassword: admin.isAllowedtoResetPassword,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}

function deleteAdmin(userName) {}

module.exports = { signup };
