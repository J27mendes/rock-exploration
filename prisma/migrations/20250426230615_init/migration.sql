-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "banda" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BandForm" (
    "id" TEXT NOT NULL,
    "idBanda" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "banda" VARCHAR(100) NOT NULL,
    "quantidadeIntegrantes" INTEGER NOT NULL,
    "integrantes" JSONB NOT NULL,
    "estilo" VARCHAR(50) NOT NULL,
    "release" VARCHAR(1200) NOT NULL,
    "imagem" JSONB NOT NULL,
    "quantidadeMusicas" INTEGER NOT NULL,
    "setList" JSONB NOT NULL,
    "contato" JSONB NOT NULL,
    "tempoApresentacao" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BandForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_banda_key" ON "User"("banda");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BandForm_idBanda_key" ON "BandForm"("idBanda");

-- CreateIndex
CREATE UNIQUE INDEX "BandForm_userId_key" ON "BandForm"("userId");

-- AddForeignKey
ALTER TABLE "BandForm" ADD CONSTRAINT "BandForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
