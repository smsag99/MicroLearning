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
    await prisma.Class.update({
      where: { id: id },
      data: updatedClass,
    });
    console.log("the Class has been successfully updated");
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
    await prisma.Class.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new ApiError(500, "database error while findUnique");
  }
}
createEmptyClass(
  "title",
  new Date("2000-01-01"),
  new Date("2020-01-01"),
  5,
  1,
  1
);
module.exports = {
  createEmptyClass,
  lockStatus,
  updateClass,
  getAllClasses,
  getAllClasses,
  getClassByID,
};
