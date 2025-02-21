/*
  Warnings:

  - You are about to drop the `CablePropertyJson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CablePropertyJson" DROP CONSTRAINT "CablePropertyJson_cableId_fkey";

-- DropTable
DROP TABLE "CablePropertyJson";

-- CreateTable
CREATE TABLE "CPJson" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,
    "cableId" INTEGER NOT NULL,

    CONSTRAINT "CPJson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CPJson" ADD CONSTRAINT "CPJson_cableId_fkey" FOREIGN KEY ("cableId") REFERENCES "Cable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
