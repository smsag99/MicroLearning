const { PrismaClient } = require("@prisma/client");
const { ApiError } = require("../../api/middlewares/errorHandling.middleware");
const { connect } = require("http2");
const { get } = require("https");
const prisma = new PrismaClient();
require("dotenv").config();


async function createEmptyTask(chapter ,
  title, priority, description, type) {
    try {
         await prisma.task.create({
            data: {
              chapter : {connect : {id : chapter}},
              title : title,
              priority : priority, 
              description : description,
              type : type
            },
          });
      } catch (error) {
        throw (new ApiError(error.statusCode, error.message));
      }
  };
  async function updateTask(updatedTask) {
    try {
      // eslint-disable-next-line no-param-reassign
      const id  = updatedTask.id
      await prisma.task.update({
        where: { id : id },
        data: updatedTask
      });
      console.log("the task has been successfully updated");
    } catch (error) {
        throw (new ApiError(error.statusCode, error.message));
    }
  }
async function getAllTasks() {
    try {
      const taskRecords = await prisma.task.findMany();
      console.log(taskRecords)
      return taskRecords;
    } catch (error) {
        throw (new ApiError(error.statusCode, error.message));
    }
  }
  async function getTaskByID(id) {
    try {
      const task = await prisma.task.findUnique({
        where: {
          id : id
        },
      });
      console.log (task)
    } catch (error) {
      throw new ApiError(500, "database error while findUnique");
    }
  }
  async function getTasksOfChapter(id){
      try {
      await prisma.task.findMany({
        where : {chapterID : id }
    });
  } catch {
    throw new ApiError(500, "error get tasks");
  }};

module.exports = {
  createEmptyTask,
  updateTask,
  getAllTasks, 
  getTaskByID,
  getTasksOfChapter
}
  