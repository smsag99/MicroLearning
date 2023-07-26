const { PrismaClient } = require("@prisma/client");
const { ApiError } = require("../../api/middlewares/errorHandling.middleware");
const { connect } = require("http2");
const { get } = require("https");
const { chain } = require("lodash");
const prisma = new PrismaClient();
require("dotenv").config();

async function createEmptyChapter(season, title, priority) {
  try {
    await prisma.chapter.create({
      data: {
        season: { connect: { id: season } },
        title: title,
        priority: priority,
      },
    });
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function updateChapter(updatedChapter) {
  try {
    // eslint-disable-next-line no-param-reassign
    const id = updatedChapter.id;
    return await prisma.chapter.update({
      where: { id: id },
      data: updatedChapter,
    });
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function getAllChapters() {
  try {
    const chapterRecords = await prisma.chapter.findMany();
    console.log(chapterRecords);
    return chapterRecords;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
}
async function getChapterByID(id) {
  try {
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: id,
      },
    });
    console.log(chapter);
    return chapter;
  } catch (error) {
    throw new ApiError(400, "database error while findUnique");
  }
}
async function getChaptersOfSeason(seasonID) {
  try {
    const chapters = await prisma.chapter.findMany({
      where: { seasonID: seasonID },
    });
    console.log(chapters);
    return chapters;
  } catch {
    throw new ApiError(400, "error while adding student to class");
  }
}

module.exports = {
  createEmptyChapter,
  updateChapter,
  getAllChapters,
  getChapterByID,
  getChaptersOfSeason,
};
