-- CreateTable
CREATE TABLE "Coin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinRate" (
    "id" SERIAL NOT NULL,
    "coinId" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coin_name_key" ON "Coin"("name");

-- AddForeignKey
ALTER TABLE "CoinRate" ADD CONSTRAINT "CoinRate_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
