const { PrismaClient } = require("@prisma/client");
const { ApiError } = require("../../api/middlewares/errorHandling.middleware");
const prisma = new PrismaClient();
require("dotenv").config();



async function ceateEmptyCourse(teacherId, title, description, isLocked){
    try {
        return await prisma.Course.create({
            data: {
              teacher : {connect : {id : teacherId }},
              title : title,
              description: description,
              isLocked : false
            },
          });
      } catch (error) {
        throw (new ApiError(error.statusCode, error.message));
      }
  };
  async function lockStatus(id ,lockStatus) {
    try {
        await prisma.Course.findUnique({
            where: {
              id: id,
            },
            data: {
                isLocked : lockStatus
            }
          });
      } catch (error) {
        throw (new ApiError(error.statusCode, error.message));
      }
  };
  async function updateCourse(Course) {
    try {
      // eslint-disable-next-line no-param-reassign
      const id = Course.id
      //delete Course.id;
      const resault = await prisma.Course.update({
        where: { id : Course.id },
        data: Course,
      });
      console.log("the Course has been successfully updated");
      return resault;
    } catch (error) {
        throw (new ApiError(error.statusCode, error.message));
    }
  }
async function getAllCourses() {
    try {
      const courseRecords = await prisma.course.findMany();
      console.log(courseRecords)
      return courseRecords;
    } catch (error) {
        throw (new ApiError(error.statusCode, error.message));
    }
  }

  async function getClassByID(id) {
    try {
      await prisma.Course.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new ApiError(500, "database error while findUnique");
    }
  }
  module.exports = {
    createEmptyCourse,
    lockStatus, 
    updateCourse,
    getAllCourses
  };