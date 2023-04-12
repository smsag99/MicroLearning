/*
  Warnings:

  - You are about to drop the column `capasity` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `season` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `task` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" DROP COLUMN "capasity",
DROP COLUMN "name",
ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "isLocked" DROP NOT NULL,
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "startTime" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "chapter" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "season" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "name";
