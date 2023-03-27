/*
  Warnings:

  - You are about to drop the column `enrolledPeople` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `taskCount` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `teacherID` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `sessions` on the `session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chpterID]` on the table `task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `TeacherID` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskcount` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `deadlineDuration` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userID` on the `EnrolledCoursebyEachUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `courseID` on the `EnrolledCoursebyEachUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `classID` on the `EnrolledCoursebyEachUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sessionID` on the `chapter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `courseID` on the `chapter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `taskID` on the `chapter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `chpterID` on the `task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `courseID` on the `task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_teacherID_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "enrolledPeople",
DROP COLUMN "taskCount",
DROP COLUMN "teacherID",
ADD COLUMN     "TeacherID" INTEGER NOT NULL,
ADD COLUMN     "enrolledpeople" TEXT[],
ADD COLUMN     "taskcount" INTEGER NOT NULL,
ALTER COLUMN "title" DROP DEFAULT,
DROP COLUMN "deadlineDuration",
ADD COLUMN     "deadlineDuration" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" DROP DEFAULT,
ALTER COLUMN "rate" DROP DEFAULT,
ALTER COLUMN "isLocked" DROP DEFAULT,
ALTER COLUMN "sessions" DROP DEFAULT;

-- AlterTable
ALTER TABLE "EnrolledCoursebyEachUser" DROP COLUMN "userID",
ADD COLUMN     "userID" INTEGER NOT NULL,
DROP COLUMN "courseID",
ADD COLUMN     "courseID" INTEGER NOT NULL,
DROP COLUMN "classID",
ADD COLUMN     "classID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "chapter" DROP COLUMN "sessionID",
ADD COLUMN     "sessionID" INTEGER NOT NULL,
DROP COLUMN "courseID",
ADD COLUMN     "courseID" INTEGER NOT NULL,
DROP COLUMN "taskID",
ADD COLUMN     "taskID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "session" DROP COLUMN "sessions",
ADD COLUMN     "chapters" TEXT[],
ALTER COLUMN "chapterID" SET DATA TYPE TEXT,
ALTER COLUMN "title" DROP DEFAULT,
ALTER COLUMN "priority" DROP DEFAULT;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "chpterID",
ADD COLUMN     "chpterID" INTEGER NOT NULL,
DROP COLUMN "courseID",
ADD COLUMN     "courseID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "task_chpterID_key" ON "task"("chpterID");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_TeacherID_fkey" FOREIGN KEY ("TeacherID") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_sessionID_fkey" FOREIGN KEY ("sessionID") REFERENCES "session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrolledCoursebyEachUser" ADD CONSTRAINT "EnrolledCoursebyEachUser_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrolledCoursebyEachUser" ADD CONSTRAINT "EnrolledCoursebyEachUser_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrolledCoursebyEachUser" ADD CONSTRAINT "EnrolledCoursebyEachUser_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter" ADD CONSTRAINT "chapter_sessionID_fkey" FOREIGN KEY ("sessionID") REFERENCES "session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter" ADD CONSTRAINT "chapter_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter" ADD CONSTRAINT "chapter_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_chpterID_fkey" FOREIGN KEY ("chpterID") REFERENCES "chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
