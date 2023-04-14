/*
  Warnings:

  - Made the column `isLocked` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `taskcount` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "isLocked" SET NOT NULL,
ALTER COLUMN "isLocked" SET DEFAULT false,
ALTER COLUMN "taskcount" SET NOT NULL,
ALTER COLUMN "taskcount" SET DEFAULT 0;
