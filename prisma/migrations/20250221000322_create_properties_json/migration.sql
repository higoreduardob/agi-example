-- CreateTable
CREATE TABLE "CablePropertyJson" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,
    "cableId" INTEGER NOT NULL,

    CONSTRAINT "CablePropertyJson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CablePropertyJson" ADD CONSTRAINT "CablePropertyJson_cableId_fkey" FOREIGN KEY ("cableId") REFERENCES "Cable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
