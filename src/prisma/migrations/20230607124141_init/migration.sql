/*
  Warnings:

  - You are about to drop the column `description` on the `task` table. All the data in the column will be lost.
  - Added the required column `content` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "description",
ADD COLUMN     "content" JSONB NOT NULL,
ADD COLUMN     "timeToRead" INTEGER NOT NULL DEFAULT 1;
