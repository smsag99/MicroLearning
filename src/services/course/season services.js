const { PrismaClient } = require("@prisma/client");
const { ApiError } = require("../../api/middlewares/errorHandling.middleware");
const { connect } = require("http2");
const { get } = require("https");
const prisma = new PrismaClient();
require("dotenv").config();


async function createEmptySeason(title ,
  course, priority) {
    try {
         await prisma.season.create({
            data: {
              course : {connect : {id : course}},
              title : title,
              priority : priority
            },
          });
      } catch (error) {
        throw (new ApiError(error.statusCode, error.message));
      }
  };
  async function updateSeason(updatedSeason) {
    try {
      // eslint-disable-next-line no-param-reassign
      const id  = updatedSeason.id
      await prisma.season.update({
        where: { id : id },
        data: updatedSeason
      });
      console.log("the seasn has been successfully updated");
    } catch (error) {
        throw (new ApiError(error.statusCode, error.message));
    }
  }
async function getAllSeasons() {
    try {
      const seasonRecords = await prisma.season.findMany();
      console.log(seasonRecords)
      return seasonRecords;
    } catch (error) {
        throw (new ApiError(error.statusCode, error.message));
    }
  }
  async function getSeasonByID(id) {
    try {
      const season = await prisma.season.findUnique({
        where: {
          id,
        },
      });
      console.log (season)
    } catch (error) {
      throw new ApiError(500, "database error while findUnique");
    }
  }
  async function getSeasonsOfCourse (courseID){
      try {
      const seasons = await prisma.season.findMany({
        where : {courseID : courseID}
    });
    console.log (seasons)
  } catch {
    throw new ApiError(500, "error while adding student to class");
  }};
module.exports = {
  createEmptySeason,
  updateSeason,
  getAllSeasons,
  getSeasonByID,
  getSeasonsOfCourse
}
  