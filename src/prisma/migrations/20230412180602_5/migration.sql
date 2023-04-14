/*
  Warnings:

  - You are about to drop the column `endTime` on the `studentsOnClass` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `studentsOnClass` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "studentsOnClass" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ALTER COLUMN "quizes" DROP NOT NULL,
ALTER COLUMN "done" DROP NOT NULL;
