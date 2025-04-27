/*
  Warnings:

  - A unique constraint covering the columns `[banda]` on the table `BandForm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BandForm_banda_key" ON "BandForm"("banda");
