/*
  Warnings:

  - You are about to drop the `OverviewData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OverviewQuote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OverviewStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OverviewData" DROP CONSTRAINT "OverviewData_statusId_fkey";

-- DropForeignKey
ALTER TABLE "OverviewQuote" DROP CONSTRAINT "OverviewQuote_dataId_fkey";

-- DropTable
DROP TABLE "OverviewData";

-- DropTable
DROP TABLE "OverviewQuote";

-- DropTable
DROP TABLE "OverviewStatus";

-- CreateTable
CREATE TABLE "Overview" (
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
    "totalMarketCap" DOUBLE PRECISION NOT NULL,
    "totalVolume24h" DOUBLE PRECISION NOT NULL,
    "totalVolume24hReported" DOUBLE PRECISION NOT NULL,
    "altcoinVolume24h" DOUBLE PRECISION NOT NULL,
    "altcoinVolume24hReported" DOUBLE PRECISION NOT NULL,
    "altcoinMarketCap" DOUBLE PRECISION NOT NULL,
    "defiQuoteVolume24h" DOUBLE PRECISION NOT NULL,
    "defiQuoteVolume24hReported" DOUBLE PRECISION NOT NULL,
    "defiQuote24hPercentageChange" DOUBLE PRECISION NOT NULL,
    "defiQuoteMarketCap" DOUBLE PRECISION NOT NULL,
    "stablecoinQuoteVolume24h" DOUBLE PRECISION NOT NULL,
    "stablecoinQuoteVolume24hReported" DOUBLE PRECISION NOT NULL,
    "stablecoinQuote24hPercentageChange" DOUBLE PRECISION NOT NULL,
    "stablecoinQuoteMarketCap" DOUBLE PRECISION NOT NULL,
    "derivativesQuoteVolume24h" DOUBLE PRECISION NOT NULL,
    "derivativesQuoteVolume24hReported" DOUBLE PRECISION NOT NULL,
    "derivativesQuote24hPercentageChange" DOUBLE PRECISION NOT NULL,
    "totalMarketCapYesterday" DOUBLE PRECISION NOT NULL,
    "totalVolume24hYesterday" DOUBLE PRECISION NOT NULL,
    "totalMarketCapYesterdayPercentageChange" DOUBLE PRECISION NOT NULL,
    "totalVolume24hYesterdayPercentageChange" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Overview_pkey" PRIMARY KEY ("id")
);
