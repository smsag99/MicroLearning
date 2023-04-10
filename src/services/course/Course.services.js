const { PrismaClient } = require("@prisma/client");
const { ApiError } = require("../../api/middlewares/errorHandling.middleware");
const prisma = new PrismaClient();
require("dotenv").config();



async function createEmptyCourse(name, teacherId, title, description) {
    try {
        return await prisma.Course.create({
            data: {
              name: name,
              teacherID : teacherId,
              title : title,
              description: description
            },
          });
      } catch (error) {
        throw (new ApiError(error.statusCode, error.message));
      }
  };
  async function lockStatus(id ,lockStatus) {
    try {
        prisma.Admin.findUnique({
            where: {
              id: id,
            },
            data: {
                isLocked : lockStatus
            }
          });
        if (lockStatus === false){
            console.log( "the course has been successfully unLocked")
        }
        else {
            console.log( "the course has been successfully Locked")
        }
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
  async function deleteCourse(name) {
    try {
      const deletedCourseName = `D-${name}`;
      await prisma.course.update({
        where: { name },
        data: {
          deletedName: deletedName,
          softDelete: true,
        },
      });
      return true;
    } catch (error) {
      throw new ApiError(500, "error while deleting");
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
  updateCourse(  {
    id: 5 ,
    name: 'annpo',
    teacherID: 1,
    title: 'test',
    description: 'testttttf',
    taskcount: null,
    isLocked: false
  })
  getAllCourses()
  module.exports = {
    createEmptyCourse,
    lockStatus, 
    updateCourse,
    getAllCourses
  };