/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ApiError } = require("../api/middlewares/errorHandling.middleware");
require("dotenv").config();
const lodash = require("lodash");

const prisma = new PrismaClient();

const signup = async (userName, password, role) => {
  const admin = await getAdminbyUserName(userName);
  console.log(admin);
  if (admin) {
    throw new ApiError(400, "This Admin Already Exists!");
  }
  const obj = {
    userName: userName,
    password: password,
    role: role,
  };
  return createAdmin(obj);
};

const login = async (userName, password) => {
  const admin = await getAdminbyUserName(userName);
  console.log(admin);
  if (!admin) {
    throw new ApiError(400, "the password or username is incorrect");
  }
  if (await bcrypt.compare(password, admin.password)) {
    return setRefereshToken(userName);
  }
  throw new ApiError(400, "the password or username is incorrect");
};

const refreshToken = async (id) => {
  const admin = await getAdminbyId(id);
  return setRefereshToken(admin.userName);
};

const logout = async (id) => {
  try {
    const admin = await getAdminbyId(id);
    admin.refreshToken = "";
    await updateAdmin(admin);
  } catch (error) {
    throw new ApiError(400, "Admin not found");
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
  console.log("getadmin by username", userName);
  try {
    return await prisma.Admin.findUnique({
      where: {
        userName,
      },
    });
  } catch (error) {
    throw new ApiError(400, "database error while findUnique");
  }
}
async function getAllAdmins() {
  try {
    const adminRecords = await prisma.admin.findMany();
    return adminRecords;
  } catch (error) {
    return error;
  }
}
async function checkRefreshToken(receivedRefreshToken) {
  const adminId = await jwt.verify(
    receivedRefreshToken,
    process.env.REFRESHTOKEN_SECRET
  ).id;
  const admin = await getAdminbyId(adminId);
  if (receivedRefreshToken === admin.refreshToken) return admin.id;
}

async function setRefereshToken(userName) {
  const admin = await getAdminbyUserName(userName);
  const refreshtoken = await jwt.sign(
    { id: admin.id },
    process.env.REFRESHTOKEN_SECRET,
    { expiresIn: 3600000 * 1000 }
  );
  const accesstoken = await jwt.sign(
    { id: admin.id },
    process.env.ACCESSTOKEN_SECRET,
    { expiresIn: 3600000 }
  );
  admin.refreshToken = refreshtoken;
  if (await updateAdmin(admin)) {
    return { accesstoken, refreshtoken };
  }
}

async function createAdmin(admin) {
  const hashedPassword = await bcrypt.hash(admin.password, 10);
  let permissions;
  switch (admin.role) {
    case "Admin":
      permissions = [
        { action: "create", subject: "Admin" },
        { action: "read", subject: "Admin" },
        { action: "update", subject: "Admin" },
        { action: "delete", subject: "Admin" },
        { action: "create", subject: "User" },
        { action: "read", subject: "User" },
        { action: "update", subject: "User" },
        { action: "delete", subject: "User" },
        { action: "create", subject: "Course" },
        { action: "read", subject: "Course" },
        { action: "update", subject: "Course" },
        { action: "delete", subject: "Course" },
        { action: "create", subject: "Chapter" },
        { action: "read", subject: "Chapter" },
        { action: "update", subject: "Chapter" },
        { action: "delete", subject: "Chapter" },
        { action: "create", subject: "Class" },
        { action: "read", subject: "Class" },
        { action: "update", subject: "Class" },
        { action: "delete", subject: "Class" },
        { action: "create", subject: "Task" },
        { action: "read", subject: "Task" },
        { action: "update", subject: "Task" },
        { action: "delete", subject: "Task" },
        { action: "create", subject: "Season" },
        { action: "read", subject: "Season" },
        { action: "update", subject: "Season" },
        { action: "delete", subject: "Season" },
        { action: "create", subject: "StudentOnClass" },
        { action: "read", subject: "StudentOnClass" },
        { action: "update", subject: "StudentOnClass" },
        { action: "delete", subject: "StudentOnClass" },
      ];
      break;
    case "Teacher":
      permissions = [
        { action: "read", subject: "Admin" },
        { action: "create", subject: "User" },
        { action: "read", subject: "User" },
        { action: "update", subject: "User" },
        { action: "delete", subject: "User" },
        { action: "create", subject: "Course" },
        { action: "read", subject: "Course" },
        { action: "update", subject: "Course" },
        { action: "delete", subject: "Course" },
        { action: "create", subject: "Chapter" },
        { action: "read", subject: "Chapter" },
        { action: "update", subject: "Chapter" },
        { action: "delete", subject: "Chapter" },
        { action: "create", subject: "Class" },
        { action: "read", subject: "Class" },
        { action: "update", subject: "Class" },
        { action: "delete", subject: "Class" },
        { action: "create", subject: "Task" },
        { action: "read", subject: "Task" },
        { action: "update", subject: "Task" },
        { action: "delete", subject: "Task" },
        { action: "create", subject: "Season" },
        { action: "read", subject: "Season" },
        { action: "update", subject: "Season" },
        { action: "delete", subject: "Season" },
        { action: "create", subject: "StudentOnClass" },
        { action: "read", subject: "StudentOnClass" },
        { action: "update", subject: "StudentOnClass" },
        { action: "delete", subject: "StudentOnClass" },
      ];
      break;
    case "Supervisor":
      permissions = [
        { action: "read", subject: "Admin" },
        { action: "read", subject: "User" },
        { action: "read", subject: "Course" },
        { action: "read", subject: "Chapter" },
        { action: "read", subject: "Class" },
        { action: "read", subject: "Task" },
        { action: "read", subject: "Season" },
        { action: "read", subject: "StudentOnClass" },
      ];
      break;
  }
  const permissionsString = JSON.stringify(permissions);
  admin.permissions = permissionsString;
  admin.password = hashedPassword;
  await prisma.Admin.create({
    data: admin,
  });
  return setRefereshToken(admin.userName);
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
    return resault;
  } catch (error) {
    throw new ApiError(400, "error while updating");
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
    throw new ApiError(400, "error while deleting");
  }
}
function omit(object) {
  if (Array.isArray(object)) {
    console.log("aray");
    return object.map((item) => omit(item));
  } else {
    console.log("non arary");
    return lodash.omit(object, ["password", "refreshToken"]);
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
  getAllAdmins,
  setRefereshToken,
  createAdmin,
  deleteAdmin,
  checkRefreshToken,
  omit,
};
