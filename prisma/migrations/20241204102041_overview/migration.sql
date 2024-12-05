-- CreateTable
CREATE TABLE "OverviewStatus" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "errorCode" INTEGER NOT NULL,
    "errorMessage" TEXT,
    "elapsed" INTEGER NOT NULL,
    "creditCount" INTEGER NOT NULL,
    "notice" TEXT,

    CONSTRAINT "OverviewStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OverviewData" (
    "id" SERIAL NOT NULL,
    "activeCryptocurrencies" INTEGER NOT NULL,
    "totalCryptocurrencies" INTEGER NOT NULL,
    "activeMarketPairs" INTEGER NOT NULL,
    "activeExchanges" INTEGER NOT NULL,
    "totalExchanges" INTEGER NOT NULL,
    "ethDominance" DOUBLE PRECISION NOT NULL,
    "btcDominance" DOUBLE PRECISION NOT NULL,
    "ethDominanceYesterday" DOUBLE PRECISION NOT NULL,
    "btcDominanceYesterday" DOUBLE PRECISION NOT NULL,
    "ethDominance24hPercentageChange" DOUBLE PRECISION NOT NULL,
    "btcDominance24hPercentageChange" DOUBLE PRECISION NOT NULL,
    "defiVolume24h" DOUBLE PRECISION NOT NULL,
    "defiVolume24hReported" DOUBLE PRECISION NOT NULL,
    "defiMarketCap" DOUBLE PRECISION NOT NULL,
    "defi24hPercentageChange" DOUBLE PRECISION NOT NULL,
    "stablecoinVolume24h" DOUBLE PRECISION NOT NULL,
    "stablecoinVolume24hReported" DOUBLE PRECISION NOT NULL,
    "stablecoinMarketCap" DOUBLE PRECISION NOT NULL,
    "stablecoin24hPercentageChange" DOUBLE PRECISION NOT NULL,
    "derivativesVolume24h" DOUBLE PRECISION NOT NULL,
    "derivativesVolume24hReported" DOUBLE PRECISION NOT NULL,
    "derivatives24hPercentageChange" DOUBLE PRECISION NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "OverviewData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OverviewQuote" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "totalMarketCap" DOUBLE PRECISION NOT NULL,
    "totalVolume24h" DOUBLE PRECISION NOT NULL,
    "totalVolume24hReported" DOUBLE PRECISION NOT NULL,
    "altcoinVolume24h" DOUBLE PRECISION NOT NULL,
    "altcoinVolume24hReported" DOUBLE PRECISION NOT NULL,
    "altcoinMarketCap" DOUBLE PRECISION NOT NULL,
    "defiVolume24h" DOUBLE PRECISION NOT NULL,
    "defiVolume24hReported" DOUBLE PRECISION NOT NULL,
    "defi24hPercentageChange" DOUBLE PRECISION NOT NULL,
    "defiMarketCap" DOUBLE PRECISION NOT NULL,
    "stablecoinVolume24h" DOUBLE PRECISION NOT NULL,
    "stablecoinVolume24hReported" DOUBLE PRECISION NOT NULL,
    "stablecoin24hPercentageChange" DOUBLE PRECISION NOT NULL,
    "stablecoinMarketCap" DOUBLE PRECISION NOT NULL,
    "derivativesVolume24h" DOUBLE PRECISION NOT NULL,
    "derivativesVolume24hReported" DOUBLE PRECISION NOT NULL,
    "derivatives24hPercentageChange" DOUBLE PRECISION NOT NULL,
    "totalMarketCapYesterday" DOUBLE PRECISION NOT NULL,
    "totalVolume24hYesterday" DOUBLE PRECISION NOT NULL,
    "totalMarketCapYesterdayPercentageChange" DOUBLE PRECISION NOT NULL,
    "totalVolume24hYesterdayPercentageChange" DOUBLE PRECISION NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "dataId" INTEGER NOT NULL,

    CONSTRAINT "OverviewQuote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OverviewData" ADD CONSTRAINT "OverviewData_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "OverviewStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OverviewQuote" ADD CONSTRAINT "OverviewQuote_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "OverviewData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
