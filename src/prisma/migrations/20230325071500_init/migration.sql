-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT '',
    "refreshToken" TEXT NOT NULL DEFAULT '',
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "softDelete" BOOLEAN NOT NULL DEFAULT false,
    "address" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "userName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT '',
    "refreshToken" TEXT NOT NULL DEFAULT '',
    "softDelete" BOOLEAN NOT NULL DEFAULT false,
    "permissions" JSONB NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "courseID" INTEGER NOT NULL,
    "mentorID" INTEGER NOT NULL,
    "studetID" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "startTime" TEXT NOT NULL DEFAULT '',
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "capasity" INTEGER NOT NULL DEFAULT 0,
    "mentors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "students" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "teacherID" INTEGER NOT NULL,
    "sessionID" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "deadlineDuration" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "rate" INTEGER NOT NULL DEFAULT 0,
    "taskCount" INTEGER NOT NULL DEFAULT 0,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "enrolledPeople" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "sessions" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "courseID" INTEGER NOT NULL,
    "chapterID" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "priority" INTEGER NOT NULL DEFAULT 0,
    "sessions" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnrolledCoursebyEachUser" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL DEFAULT '',
    "courseID" TEXT NOT NULL DEFAULT '',
    "classID" TEXT NOT NULL DEFAULT '',
    "mark" INTEGER NOT NULL DEFAULT 0,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "startTime" TEXT NOT NULL DEFAULT '',
    "endTime" TEXT NOT NULL DEFAULT '',
    "quizes" JSONB NOT NULL,
    "done" JSONB NOT NULL,

    CONSTRAINT "EnrolledCoursebyEachUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapter" (
    "id" SERIAL NOT NULL,
    "sessionID" TEXT NOT NULL DEFAULT '',
    "courseID" TEXT NOT NULL DEFAULT '',
    "taskID" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "priority" INTEGER NOT NULL DEFAULT 0,
    "examID" TEXT NOT NULL DEFAULT '',
    "tasks" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "chpterID" TEXT NOT NULL DEFAULT '',
    "courseID" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "priority" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quize" (
    "id" SERIAL NOT NULL,
    "row1" TEXT NOT NULL DEFAULT '',
    "row2" TEXT NOT NULL DEFAULT '',
    "row3" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Quize_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userName_key" ON "Admin"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Course_sessionID_key" ON "Course"("sessionID");

-- CreateIndex
CREATE UNIQUE INDEX "session_courseID_key" ON "session"("courseID");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_mentorID_fkey" FOREIGN KEY ("mentorID") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_studetID_fkey" FOREIGN KEY ("studetID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
