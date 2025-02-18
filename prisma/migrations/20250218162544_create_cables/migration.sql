-- CreateTable
CREATE TABLE "Cable" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CableProperty" (
    "id" TEXT NOT NULL,
    "temperature" INTEGER[],
    "humidity" INTEGER[],
    "carboneDioxide" INTEGER[],
    "inactiveSensors" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cableId" TEXT NOT NULL,

    CONSTRAINT "CableProperty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CableProperty" ADD CONSTRAINT "CableProperty_cableId_fkey" FOREIGN KEY ("cableId") REFERENCES "Cable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
