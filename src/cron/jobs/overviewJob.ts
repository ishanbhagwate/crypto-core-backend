import axios from "axios";
import {
  COINMARKETCAP_FEAR_GREED_API_URL,
  COINMARKETCAP_OVERVIEW_API_URL,
} from "../../config/cronConfig";
import prisma from "../../lib/prisma";

// Root Interface
interface CryptoApiResponse {
  status: Status;
  data: OverviewData;
}

// Status Interface
interface Status {
  timestamp: string; // ISO Date string
  error_code: number;
  error_message: string | null;
  elapsed: number;
  credit_count: number;
  notice: string | null;
}

// Crypto Data Interface
interface OverviewData {
  active_cryptocurrencies: number;
  total_cryptocurrencies: number;
  active_market_pairs: number;
  active_exchanges: number;
  total_exchanges: number;
  eth_dominance: number;
  btc_dominance: number;
  eth_dominance_yesterday: number;
  btc_dominance_yesterday: number;
  eth_dominance_24h_percentage_change: number;
  btc_dominance_24h_percentage_change: number;
  defi_volume_24h: number;
  defi_volume_24h_reported: number;
  defi_market_cap: number;
  defi_24h_percentage_change: number;
  stablecoin_volume_24h: number;
  stablecoin_volume_24h_reported: number;
  stablecoin_market_cap: number;
  stablecoin_24h_percentage_change: number;
  derivatives_volume_24h: number;
  derivatives_volume_24h_reported: number;
  derivatives_24h_percentage_change: number;
  last_updated: string; // ISO Date string
  quote: {
    USD: {
      total_market_cap: number;
      total_volume_24h: number;
      total_volume_24h_reported: number;
      altcoin_volume_24h: number;
      altcoin_volume_24h_reported: number;
      altcoin_market_cap: number;
      defi_volume_24h: number;
      defi_volume_24h_reported: number;
      defi_24h_percentage_change: number;
      defi_market_cap: number;
      stablecoin_volume_24h: number;
      stablecoin_volume_24h_reported: number;
      stablecoin_24h_percentage_change: number;
      stablecoin_market_cap: number;
      derivatives_volume_24h: number;
      derivatives_volume_24h_reported: number;
      derivatives_24h_percentage_change: number;
      total_market_cap_yesterday: number;
      total_volume_24h_yesterday: number;
      total_market_cap_yesterday_percentage_change: number;
      total_volume_24h_yesterday_percentage_change: number;
    };
  };
}

interface FearAndGreedDataResponse {
  status: {
    timestamp: string;
    error_code: number;
    error_message: string;
    elapsed: number;
    credit_count: number;
    notice: string;
  };
  data: {
    value: number;
    value_classification: string;
    update_time: string;
  };
}

async function fetchOverviewData() {
  try {
    const response = await axios.get<CryptoApiResponse>(
      COINMARKETCAP_OVERVIEW_API_URL,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.API_KEY,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

async function fetchFearAndGreedData() {
  try {
    const response = await axios.get<FearAndGreedDataResponse>(
      COINMARKETCAP_FEAR_GREED_API_URL,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.API_KEY,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

async function updateOverview() {
  //fetch the latest overview data
  const overviewData = await fetchOverviewData();
  const fearAndGreedData = await fetchFearAndGreedData();

  await prisma.overview.upsert({
    where: { id: 1 },
    update: {
      activeCryptocurrencies: overviewData.active_cryptocurrencies,
      totalCryptocurrencies: overviewData.total_cryptocurrencies,
      activeMarketPairs: overviewData.active_market_pairs,
      activeExchanges: overviewData.active_exchanges,
      totalExchanges: overviewData.total_exchanges,
      ethDominance: overviewData.eth_dominance,
      btcDominance: overviewData.btc_dominance,
      ethDominanceYesterday: overviewData.eth_dominance_yesterday,
      btcDominanceYesterday: overviewData.btc_dominance_yesterday,
      ethDominance24hPercentageChange:
        overviewData.eth_dominance_24h_percentage_change,
      btcDominance24hPercentageChange:
        overviewData.btc_dominance_24h_percentage_change,
      defiVolume24h: overviewData.defi_volume_24h,
      defiVolume24hReported: overviewData.defi_volume_24h_reported,
      defiMarketCap: overviewData.defi_market_cap,
      defi24hPercentageChange: overviewData.defi_24h_percentage_change,
      stablecoinVolume24h: overviewData.stablecoin_volume_24h,
      stablecoinVolume24hReported: overviewData.stablecoin_volume_24h_reported,
      stablecoinMarketCap: overviewData.stablecoin_market_cap,
      stablecoin24hPercentageChange:
        overviewData.stablecoin_24h_percentage_change,
      derivativesVolume24h: overviewData.derivatives_volume_24h,
      derivativesVolume24hReported:
        overviewData.derivatives_volume_24h_reported,
      derivatives24hPercentageChange:
        overviewData.derivatives_24h_percentage_change,
      lastUpdated: overviewData.last_updated,
      totalMarketCap: overviewData.quote.USD.total_market_cap,
      totalVolume24h: overviewData.quote.USD.total_volume_24h,
      totalVolume24hReported: overviewData.quote.USD.total_volume_24h_reported,
      altcoinVolume24h: overviewData.quote.USD.altcoin_volume_24h,
      altcoinVolume24hReported:
        overviewData.quote.USD.altcoin_volume_24h_reported,
      altcoinMarketCap: overviewData.quote.USD.altcoin_market_cap,
      defiQuoteVolume24h: overviewData.quote.USD.defi_volume_24h,
      defiQuoteVolume24hReported:
        overviewData.quote.USD.defi_volume_24h_reported,
      defiQuote24hPercentageChange:
        overviewData.quote.USD.defi_24h_percentage_change,
      defiQuoteMarketCap: overviewData.quote.USD.defi_market_cap,
      stablecoinQuoteVolume24h: overviewData.quote.USD.stablecoin_volume_24h,
      stablecoinQuoteVolume24hReported:
        overviewData.quote.USD.stablecoin_volume_24h_reported,
      stablecoinQuote24hPercentageChange:
        overviewData.quote.USD.stablecoin_24h_percentage_change,
      stablecoinQuoteMarketCap: overviewData.quote.USD.stablecoin_market_cap,
      derivativesQuoteVolume24h: overviewData.quote.USD.derivatives_volume_24h,
      derivativesQuoteVolume24hReported:
        overviewData.quote.USD.defi_volume_24h_reported,
      derivativesQuote24hPercentageChange:
        overviewData.quote.USD.defi_24h_percentage_change,
      totalMarketCapYesterday:
        overviewData.quote.USD.total_market_cap_yesterday,
      totalVolume24hYesterday:
        overviewData.quote.USD.total_volume_24h_yesterday,
      totalMarketCapYesterdayPercentageChange:
        overviewData.quote.USD.total_market_cap_yesterday_percentage_change,
      totalVolume24hYesterdayPercentageChange:
        overviewData.quote.USD.total_volume_24h_yesterday_percentage_change,
    },
    create: {
      id: 1,
      activeCryptocurrencies: overviewData.active_cryptocurrencies,
      totalCryptocurrencies: overviewData.total_cryptocurrencies,
      activeMarketPairs: overviewData.active_market_pairs,
      activeExchanges: overviewData.active_exchanges,
      totalExchanges: overviewData.total_exchanges,
      ethDominance: overviewData.eth_dominance,
      btcDominance: overviewData.btc_dominance,
      ethDominanceYesterday: overviewData.eth_dominance_yesterday,
      btcDominanceYesterday: overviewData.btc_dominance_yesterday,
      ethDominance24hPercentageChange:
        overviewData.eth_dominance_24h_percentage_change,
      btcDominance24hPercentageChange:
        overviewData.btc_dominance_24h_percentage_change,
      defiVolume24h: overviewData.defi_volume_24h,
      defiVolume24hReported: overviewData.defi_volume_24h_reported,
      defiMarketCap: overviewData.defi_market_cap,
      defi24hPercentageChange: overviewData.defi_24h_percentage_change,
      stablecoinVolume24h: overviewData.stablecoin_volume_24h,
      stablecoinVolume24hReported: overviewData.stablecoin_volume_24h_reported,
      stablecoinMarketCap: overviewData.stablecoin_market_cap,
      stablecoin24hPercentageChange:
        overviewData.stablecoin_24h_percentage_change,
      derivativesVolume24h: overviewData.derivatives_volume_24h,
      derivativesVolume24hReported:
        overviewData.derivatives_volume_24h_reported,
      derivatives24hPercentageChange:
        overviewData.derivatives_24h_percentage_change,
      lastUpdated: overviewData.last_updated,
      totalMarketCap: overviewData.quote.USD.total_market_cap,
      totalVolume24h: overviewData.quote.USD.total_volume_24h,
      totalVolume24hReported: overviewData.quote.USD.total_volume_24h_reported,
      altcoinVolume24h: overviewData.quote.USD.altcoin_volume_24h,
      altcoinVolume24hReported:
        overviewData.quote.USD.altcoin_volume_24h_reported,
      altcoinMarketCap: overviewData.quote.USD.altcoin_market_cap,
      defiQuoteVolume24h: overviewData.quote.USD.defi_volume_24h,
      defiQuoteVolume24hReported:
        overviewData.quote.USD.defi_volume_24h_reported,
      defiQuote24hPercentageChange:
        overviewData.quote.USD.defi_24h_percentage_change,
      defiQuoteMarketCap: overviewData.quote.USD.defi_market_cap,
      stablecoinQuoteVolume24h: overviewData.quote.USD.stablecoin_volume_24h,
      stablecoinQuoteVolume24hReported:
        overviewData.quote.USD.stablecoin_volume_24h_reported,
      stablecoinQuote24hPercentageChange:
        overviewData.quote.USD.stablecoin_24h_percentage_change,
      stablecoinQuoteMarketCap: overviewData.quote.USD.stablecoin_market_cap,
      derivativesQuoteVolume24h: overviewData.quote.USD.derivatives_volume_24h,
      derivativesQuoteVolume24hReported:
        overviewData.quote.USD.defi_volume_24h_reported,
      derivativesQuote24hPercentageChange:
        overviewData.quote.USD.defi_24h_percentage_change,
      totalMarketCapYesterday:
        overviewData.quote.USD.total_market_cap_yesterday,
      totalVolume24hYesterday:
        overviewData.quote.USD.total_volume_24h_yesterday,
      totalMarketCapYesterdayPercentageChange:
        overviewData.quote.USD.total_market_cap_yesterday_percentage_change,
      totalVolume24hYesterdayPercentageChange:
        overviewData.quote.USD.total_volume_24h_yesterday_percentage_change,
    },
  });
}

export default async () => {
  console.log("Fetching latest overview data...");

  try {
    await updateOverview();
    console.log("Overview updated ");
  } catch (error) {
    console.error("Overview update failed: ", error);
  }
};
