const { PrismaClient } = require("@prisma/client");
const { ApiError } = require("../../api/middlewares/errorHandling.middleware");
const prisma = new PrismaClient();
require("dotenv").config();

async function createEmptyCourse(teacherId, title, description) {
  try {
    await prisma.Course.create({
      data: {
        teacher: { connect: { id: teacherId } },
        title: title,
        description: description,
      },
    });
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function lockStatus(id, lockStatus) {
  try {
    const lock = await prisma.Course.update({
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
async function updateCourse(Course) {
  try {
    // eslint-disable-next-line no-param-reassign
    const id = Course.id;
    //delete Course.id;
    const resault = await prisma.Course.update({
      where: { id: Course.id },
      data: Course,
    });
    console.log("the Course has been successfully updated");
    return resault;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function getAllCourses() {
  try {
    const courseRecords = await prisma.course.findMany();
    console.log(courseRecords);
    return courseRecords;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function getCourseByID(id) {
  try {
    const res = await prisma.Course.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  } catch (error) {
    throw new ApiError(500, "database error while findUnique");
  }
}
module.exports = {
  createEmptyCourse,
  lockStatus,
  updateCourse,
  getAllCourses,
  getCourseByID,
};
