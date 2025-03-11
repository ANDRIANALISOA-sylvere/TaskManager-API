/*
  Warnings:

  - The `status` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('FAIBLE', 'MOYENNE', 'ELEVE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TODO', 'INPROGRESSE', 'COMPLETE');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'FAIBLE',
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'TODO';
