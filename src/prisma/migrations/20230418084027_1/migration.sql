/*
  Warnings:

  - The `quizes` column on the `studentsOnClass` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `done` column on the `studentsOnClass` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "studentsOnClass" DROP COLUMN "quizes",
ADD COLUMN     "quizes" JSONB[],
DROP COLUMN "done",
ADD COLUMN     "done" INTEGER[];
