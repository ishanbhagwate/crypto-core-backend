import axios from "axios";
import {
  COINMARKETCAP_LISTING_API_URL,
  COINMARKETCAP_METADATA_API_URL,
} from "../../config/cronConfig";
import prisma from "../../lib/prisma";

interface Quote {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: string;
}

interface CoinMarketCapData {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  infinite_supply: boolean;
  last_updated: string;
  date_added: string;
  tags: string[];
  quote: {
    USD: Quote;
    BTC: Quote;
  };
}

interface CoinMarketCapResponse {
  data: CoinMarketCapData[];
}

interface CryptoMetadataResponse {
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  };
  data: {
    [key: string]: {
      id: number;
      name: string;
      symbol: string;
      category: string;
      description: string;
      slug: string;
      logo: string;
      subreddit: string;
      notice: string;
      tags: string[];
      "tag-names": string[];
      "tag-groups": string[];
      urls: {
        website: string[];
        twitter: string[];
        message_board: string[];
        chat: string[];
        facebook: string[];
        explorer: string[];
        reddit: string[];
        technical_doc: string[];
        source_code: string[];
        announcement: string[];
      };
      platform: {
        id: string;
        name: string;
        slug: string;
        symbol: string;
        token_address: string;
      } | null;
      date_added: string;
      twitter_username: string;
      is_hidden: number;
      date_launched: string | null;
      contract_address: Array<{
        contract_address: string;
        platform: {
          name: string;
          coin: {
            id: string;
            name: string;
            symbol: string;
            slug: string;
          };
        };
      }>;
      self_reported_circulating_supply: number | null;
      self_reported_tags: string[] | null;
      self_reported_market_cap: number | null;
      infinite_supply: boolean;
    };
  };
}

async function fetchCryptoData() {
  try {
    const response = await axios.get<CoinMarketCapResponse>(
      COINMARKETCAP_LISTING_API_URL,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.API_KEY,
        },
        params: {
          limit: 400,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

async function updateCryptoCoins() {
  //fetch the latest top 100 crypto data
  const cryptoData = await fetchCryptoData();

  //fetch the logos and add them
  const metadata = await axios.get<CryptoMetadataResponse>(
    COINMARKETCAP_METADATA_API_URL,
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.API_KEY,
      },
      params: {
        id: [...cryptoData.map((e) => e.id)].join(","),
      },
    }
  );

  // console.log(metadata.data);
  // console.log(metadata.data.data[1].logo);

  await prisma.$transaction(
    cryptoData.map((coin) =>
      prisma.cryptocurrency.upsert({
        where: { id: coin.id },
        update: {
          name: coin.name,
          symbol: coin.symbol,
          slug: coin.slug,
          logo: metadata.data.data[coin.id].logo,
          cmcRank: coin.cmc_rank,
          circulatingSupply: coin.circulating_supply,
          totalSupply: coin.total_supply,
          maxSupply: coin.max_supply,
          infiniteSupply: coin.infinite_supply,
          lastUpdated: new Date(coin.last_updated),
          dateAdded: new Date(coin.date_added),
        },
        create: {
          id: coin.id,
          name: coin.name,
          logo: metadata.data.data[coin.id].logo,
          symbol: coin.symbol,
          slug: coin.slug,
          cmcRank: coin.cmc_rank,
          circulatingSupply: coin.circulating_supply,
          totalSupply: coin.total_supply,
          maxSupply: coin.max_supply,
          infiniteSupply: coin.infinite_supply,
          lastUpdated: new Date(coin.last_updated),
          dateAdded: new Date(coin.date_added),
          quotes: {
            create: Object.entries(coin.quote).map(([currency, quote]) => ({
              currency,
              price: quote.price,
              volume24h: quote.volume_24h,
              volumeChange24h: quote.volume_change_24h,
              percentChange1h: quote.percent_change_1h,
              percentChange24h: quote.percent_change_24h,
              percentChange7d: quote.percent_change_7d,
              marketCap: quote.market_cap,
              marketCapDominance: quote.market_cap_dominance,
              fullyDilutedMarketCap: quote.fully_diluted_market_cap,
              lastUpdated: new Date(quote.last_updated),
            })),
          },
        },
      })
    )
  );
}

export default async () => {
  console.log("Fetching latest crypto data...");

  try {
    await updateCryptoCoins();
    console.log("Crypto coins updated ");
  } catch (error) {
    console.error("Crypto coins update failed: ", error);
  }
};
