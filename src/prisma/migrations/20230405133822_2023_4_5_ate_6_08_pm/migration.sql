/*
  Warnings:

  - You are about to drop the column `mentors` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `students` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `studetID` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `enrolledpeople` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `seasions` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseID` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the column `tasks` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the column `courseID` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `EnrolledCoursebyEachUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seasion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `title` on the `Class` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startTime` on the `Class` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `taskType` to the `chapter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_studetID_fkey";

-- DropForeignKey
ALTER TABLE "EnrolledCoursebyEachUser" DROP CONSTRAINT "EnrolledCoursebyEachUser_classID_fkey";

-- DropForeignKey
ALTER TABLE "EnrolledCoursebyEachUser" DROP CONSTRAINT "EnrolledCoursebyEachUser_userID_fkey";

-- DropForeignKey
ALTER TABLE "chapter" DROP CONSTRAINT "chapter_courseID_fkey";

-- DropForeignKey
ALTER TABLE "chapter" DROP CONSTRAINT "chapter_seasionID_fkey";

-- DropForeignKey
ALTER TABLE "seasion" DROP CONSTRAINT "seasion_courseID_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_courseID_fkey";

-- DropIndex
DROP INDEX "task_chpterID_key";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "mentors",
DROP COLUMN "students",
DROP COLUMN "studetID",
DROP COLUMN "title",
ADD COLUMN     "title" TIMESTAMP(3) NOT NULL,
DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "enrolledpeople",
DROP COLUMN "seasions",
ALTER COLUMN "rate" DROP NOT NULL,
ALTER COLUMN "isLocked" SET DEFAULT false,
ALTER COLUMN "taskcount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "chapter" DROP COLUMN "courseID",
DROP COLUMN "tasks",
ADD COLUMN     "taskType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "courseID";

-- DropTable
DROP TABLE "EnrolledCoursebyEachUser";

-- DropTable
DROP TABLE "Quize";

-- DropTable
DROP TABLE "seasion";

-- DropTable
DROP TABLE "test";

-- CreateTable
CREATE TABLE "seassion" (
    "id" SERIAL NOT NULL,
    "courseID" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,

    CONSTRAINT "seassion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentsOnClass" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "classID" INTEGER NOT NULL,
    "mark" INTEGER NOT NULL DEFAULT 0,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "quizes" JSONB NOT NULL,
    "done" JSONB NOT NULL,

    CONSTRAINT "studentsOnClass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seassion_courseID_key" ON "seassion"("courseID");

-- AddForeignKey
ALTER TABLE "seassion" ADD CONSTRAINT "seassion_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentsOnClass" ADD CONSTRAINT "studentsOnClass_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentsOnClass" ADD CONSTRAINT "studentsOnClass_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter" ADD CONSTRAINT "chapter_seasionID_fkey" FOREIGN KEY ("seasionID") REFERENCES "seassion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
