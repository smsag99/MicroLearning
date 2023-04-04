/*
  Warnings:

  - You are about to drop the column `sessionID` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `sessions` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseID` on the `EnrolledCoursebyEachUser` table. All the data in the column will be lost.
  - You are about to drop the column `sessionID` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the column `taskID` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `startTime` on the `EnrolledCoursebyEachUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTime` on the `EnrolledCoursebyEachUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `seasionID` to the `chapter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_sessionID_fkey";

-- DropForeignKey
ALTER TABLE "EnrolledCoursebyEachUser" DROP CONSTRAINT "EnrolledCoursebyEachUser_courseID_fkey";

-- DropForeignKey
ALTER TABLE "chapter" DROP CONSTRAINT "chapter_sessionID_fkey";

-- DropForeignKey
ALTER TABLE "chapter" DROP CONSTRAINT "chapter_taskID_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_courseID_fkey";

-- DropIndex
DROP INDEX "Course_sessionID_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "sessionID",
DROP COLUMN "sessions",
ADD COLUMN     "seasions" TEXT[];

-- AlterTable
ALTER TABLE "EnrolledCoursebyEachUser" DROP COLUMN "courseID",
DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "chapter" DROP COLUMN "sessionID",
DROP COLUMN "taskID",
ADD COLUMN     "seasionID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "session";

-- CreateTable
CREATE TABLE "seasion" (
    "id" SERIAL NOT NULL,
    "courseID" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "chapters" TEXT[],

    CONSTRAINT "seasion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seasion_courseID_key" ON "seasion"("courseID");

-- AddForeignKey
ALTER TABLE "seasion" ADD CONSTRAINT "seasion_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter" ADD CONSTRAINT "chapter_seasionID_fkey" FOREIGN KEY ("seasionID") REFERENCES "seasion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
