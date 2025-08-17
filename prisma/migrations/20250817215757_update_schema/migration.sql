/*
  Warnings:

  - You are about to drop the column `benefits` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Job` table. All the data in the column will be lost.
  - Added the required column `city` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualifications` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workExperience` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "benefits",
DROP COLUMN "location",
DROP COLUMN "type",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "dateOpened" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "jobType" "JobType" NOT NULL,
ADD COLUMN     "qualifications" JSONB NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "workExperience" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT;

-- CreateTable
CREATE TABLE "JobResponsibility" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "points" JSONB NOT NULL,
    "jobId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "JobResponsibility_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JobResponsibility_jobId_idx" ON "JobResponsibility"("jobId");

-- AddForeignKey
ALTER TABLE "JobResponsibility" ADD CONSTRAINT "JobResponsibility_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
