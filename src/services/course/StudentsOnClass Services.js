const { PrismaClient } = require("@prisma/client");
const { ApiError } = require("../../api/middlewares/errorHandling.middleware");
const { connect } = require("http2");
const { get } = require("https");
const prisma = new PrismaClient();
require("dotenv").config();

//only admin can makes class
async function addStudent(
  student,
  classID,
  mark,
  progress,
  startTime,
  endTime
) {
  if ((await getStudentByID(student, classID)) == null)
    try {
      console.log(
        await prisma.studentsOnClass.create({
          data: {
            student: { connect: { id: student } },
            class: { connect: { id: classID } },
            mark: mark,
            progress: progress,
            startTime: startTime,
            endTime: endTime,
          },
        })
      );
    } catch (error) {
      throw new ApiError(error.statusCode, error.message);
    }
}
async function updateStudent(updatedStudent) {
  try {
    // eslint-disable-next-line no-param-reassign
    const userId = updatedStudent.userId;
    const classId = updatedStudent.classId;
    const record = await getStudentByID(userId, classId);
    return await prisma.studentsOnClass.update({
      where: {
        id: record.id,
      },
      data: updatedStudent,
    });
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function getAllStudentsOnClass(classID) {
  try {
    const StudentRecords = await prisma.studentsOnClass.findMany({
      where: { classID: classID },
    });
    console.log(StudentRecords);
    return StudentRecords;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
//get classes of student
async function getClassesOfStudent(id) {
  try {
    const StudentRecords = await prisma.studentsOnClass.findMany({
      where: { userID: id },
    });
    console.log(StudentRecords);
    return StudentRecords;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function getStudentByID(userID, classID) {
  try {
    const student = await prisma.studentsOnClass.findFirst({
      where: {
        userID: userID,
        classID: classID,
      },
    });
    console.log(student);
    return student;
  } catch (error) {
    throw new ApiError(500, "database error while findUnique");
  }
}

module.exports = {
  addStudent,
  updateStudent,
  getAllStudentsOnClass,
  getStudentByID,
  getClassesOfStudent,
};
