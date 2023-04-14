/*
  Warnings:

  - You are about to drop the column `userID` on the `studentsOnClass` table. All the data in the column will be lost.
  - The `done` column on the `studentsOnClass` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `studentID` to the `studentsOnClass` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "studentsOnClass" DROP CONSTRAINT "studentsOnClass_userID_fkey";

-- AlterTable
ALTER TABLE "studentsOnClass" DROP COLUMN "userID",
ADD COLUMN     "studentID" INTEGER NOT NULL,
DROP COLUMN "done",
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "studentsOnClass" ADD CONSTRAINT "studentsOnClass_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
