/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "bio" TEXT;
ALTER TABLE "User" ADD COLUMN "quote" TEXT DEFAULT 'Push it to the limit!';

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
