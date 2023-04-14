/*
  Warnings:

  - You are about to drop the column `studentID` on the `studentsOnClass` table. All the data in the column will be lost.
  - The `done` column on the `studentsOnClass` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `isLocked` on table `Class` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `endTime` to the `studentsOnClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `studentsOnClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `studentsOnClass` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "studentsOnClass" DROP CONSTRAINT "studentsOnClass_studentID_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "isLocked" SET NOT NULL,
ALTER COLUMN "isLocked" SET DEFAULT false,
ALTER COLUMN "startTime" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "rate" INTEGER,
ALTER COLUMN "isLocked" DROP DEFAULT;

-- AlterTable
ALTER TABLE "studentsOnClass" DROP COLUMN "studentID",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userID" INTEGER NOT NULL,
DROP COLUMN "done",
ADD COLUMN     "done" JSONB;

-- AddForeignKey
ALTER TABLE "studentsOnClass" ADD CONSTRAINT "studentsOnClass_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
