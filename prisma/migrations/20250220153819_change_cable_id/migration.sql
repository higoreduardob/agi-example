/*
  Warnings:

  - The primary key for the `Cable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Cable` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `cableId` on the `CableProperty` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "CableProperty" DROP CONSTRAINT "CableProperty_cableId_fkey";

-- AlterTable
ALTER TABLE "Cable" DROP CONSTRAINT "Cable_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Cable_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CableProperty" DROP COLUMN "cableId",
ADD COLUMN     "cableId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CableProperty" ADD CONSTRAINT "CableProperty_cableId_fkey" FOREIGN KEY ("cableId") REFERENCES "Cable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
