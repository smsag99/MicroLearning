const { PrismaClient } = require("@prisma/client");
const { ApiError } = require("../../api/middlewares/errorHandling.middleware");
const { connect } = require("http2");
const { get } = require("https");
const prisma = new PrismaClient();
require("dotenv").config();

//only admin can makes class
async function createEmptyClass(
  title,
  startTime = Date.prototype.getDate(),
  endTime = Date.prototype.setMonth(6),
  capacity,
  course,
  mentor
) {
  try {
    const classe = await prisma.Class.create({
      data: {
        title: title,
        startTime: startTime,
        endTime: endTime,
        capacity: capacity,
        course: { connect: { id: course } },
        mentor: { connect: { id: mentor } },
      },
    });
    console.log(classe);
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function lockStatus(id, lockStatus) {
  try {
    const lock = await prisma.Class.update({
      where: {
        id: id,
      },
      data: { isLocked: lockStatus },
    });
    console.log(lock);
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function updateClass(updatedClass) {
  try {
    // eslint-disable-next-line no-param-reassign
    const id = updatedClass.id;
    return await prisma.Class.update({
      where: { id: id },
      data: updatedClass,
    });
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function getAllClasses() {
  try {
    const courseRecords = await prisma.Class.findMany();
    console.log(courseRecords);
    return courseRecords;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function getClassByID(id) {
  try {
    const res = await prisma.Class.findUnique({
      where: {
        id,
      },
    });
    return res;
  } catch (error) {
    throw new ApiError(400, "database error while findUnique");
  }
}
module.exports = {
  createEmptyClass,
  lockStatus,
  updateClass,
  getAllClasses,
  getAllClasses,
  getClassByID,
};
