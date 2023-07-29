-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "supervisorID" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_supervisorID_fkey" FOREIGN KEY ("supervisorID") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
