const { PrismaClient } = require("@prisma/client");
const { ApiError } = require("../../api/middlewares/errorHandling.middleware");
const { connect } = require("http2");
const { get } = require("https");
const prisma = new PrismaClient();
require("dotenv").config();

//only admin can makes class
async function newStudent(
  student,
  classID,
  mark,
  progress,
  startTime,
  endTime
) {
  try {
    console.log (await prisma.studentsOnClass.create({
      data: {
        student: { connect: { id: student } },
        class: { connect: { id: classID } },
        mark: mark,
        progress: progress,
        startTime: startTime,
        endTime: endTime,
      },
    }));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function updateStudent(updatedStudent) {
  try {
    // eslint-disable-next-line no-param-reassign
    const id = updatedStudent.id;
    await prisma.studentsOnClass.update({
      where: { id: id },
      data: updatedStudent,
    });
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function getAllStudentsOnClass() {
  try {
    const StudentRecords = await prisma.studentsOnClass.findMany({
      where: { id: id },
    });
    console.log(StudentRecords);
    return StudentRecords;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function getStudentByID(id) {
  try {
    await prisma.studentsOnClass.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw new ApiError(500, "database error while findUnique");
  }
}
async function test() {
  classes = await prisma.class.findMany();
  students = await prisma.user.findMany();
  console.log(classes);
  console.log(students);
}
//test();

newStudent(1, 1, 0, 0, new Date("2000-01-01"), new Date("2020-01-01"));

module.exports = {};
