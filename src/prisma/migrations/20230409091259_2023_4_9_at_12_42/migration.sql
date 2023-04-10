/*
  Warnings:

  - You are about to drop the column `deadlineDuration` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `examID` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the column `seasionID` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the column `taskType` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the `seassion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `seasonID` to the `chapter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chapter" DROP CONSTRAINT "chapter_seasionID_fkey";

-- DropForeignKey
ALTER TABLE "seassion" DROP CONSTRAINT "seassion_courseID_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "deadlineDuration",
DROP COLUMN "rate",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "isLocked" DROP DEFAULT;

-- AlterTable
ALTER TABLE "chapter" DROP COLUMN "examID",
DROP COLUMN "seasionID",
DROP COLUMN "taskType",
ADD COLUMN     "seasonID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "seassion";

-- CreateTable
CREATE TABLE "season" (
    "id" SERIAL NOT NULL,
    "courseID" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,

    CONSTRAINT "season_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "season" ADD CONSTRAINT "season_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter" ADD CONSTRAINT "chapter_seasonID_fkey" FOREIGN KEY ("seasonID") REFERENCES "season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
