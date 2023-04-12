-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'new class';

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "name" SET DEFAULT 'new course';

-- AlterTable
ALTER TABLE "chapter" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'new chapter';

-- AlterTable
ALTER TABLE "season" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'new season';

-- AlterTable
ALTER TABLE "task" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'new task';
