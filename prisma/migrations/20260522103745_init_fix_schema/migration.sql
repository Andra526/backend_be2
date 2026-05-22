/*
  Warnings:

  - Added the required column `email` to the `pembicara` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pembicara" ADD COLUMN     "email" TEXT NOT NULL;
