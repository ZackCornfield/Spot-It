-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(8) NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Target" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "xCoords" INTEGER NOT NULL,
    "yCoords" INTEGER NOT NULL,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Target_name_key" ON "Target"("name");
