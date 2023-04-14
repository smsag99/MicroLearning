/*
  Warnings:

  - You are about to drop the column `chpterID` on the `task` table. All the data in the column will be lost.
  - Added the required column `chapterID` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_chpterID_fkey";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "chpterID",
ADD COLUMN     "chapterID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_chapterID_fkey" FOREIGN KEY ("chapterID") REFERENCES "chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
