/*
  Warnings:

  - You are about to drop the column `TeacherID` on the `Course` table. All the data in the column will be lost.
  - Added the required column `teacherID` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_TeacherID_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "TeacherID",
ADD COLUMN     "teacherID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
