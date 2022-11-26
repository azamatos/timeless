/*
  Warnings:

  - You are about to drop the `Dog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Owner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dog" DROP CONSTRAINT "Dog_ownerId_fkey";

-- DropTable
DROP TABLE "Dog";

-- DropTable
DROP TABLE "Owner";

-- CreateTable
CREATE TABLE "TaskList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "update" BOOLEAN NOT NULL DEFAULT false,
    "delete" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,

    CONSTRAINT "TaskList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskList" ADD CONSTRAINT "TaskList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
