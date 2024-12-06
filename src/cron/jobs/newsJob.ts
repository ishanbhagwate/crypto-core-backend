import { CRYPTO_PANIC_NEWS_API_URL } from "../../config/cronConfig";
import prisma from "../../lib/prisma";
import axios from "axios";

interface NewsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsArticle[];
}

interface NewsArticle {
  kind: string;
  domain: string;
  source: {
    title: string;
    region: string;
    domain: string;
    path: string | null;
    type: string;
  };
  title: string;
  published_at: string;
  slug: string;
  id: number;
  url: string;
  created_at: string;
  votes: Votes;
}

interface Votes {
  negative: number;
  positive: number;
  important: number;
  liked: number;
  disliked: number;
  lol: number;
  toxic: number;
  saved: number;
  comments: number;
}

async function fetchAllNews() {
  try {
    //fetch 5 times for 100 news
    const newsRes = new Array<NewsArticle>();

    for (let index = 1; index <= 5; index++) {
      const response = await axios.get<NewsResponse>(
        CRYPTO_PANIC_NEWS_API_URL,
        {
          params: {
            auth_token: process.env.CRYPTO_PANIC_API_KEY,
            page: index,
          },
        }
      );
      newsRes.push(...response.data.results);
    }

    // console.log(newsRes);
    // console.log(newsRes.length);

    return newsRes;
  } catch (error) {
    console.error(error);
    console.error("Error fetching data: ", error);
  }
}

async function updateNews() {
  const newsData = await fetchAllNews();

  await prisma.$transaction(
    newsData!.map((news) =>
      prisma.news.upsert({
        create: {
          id: news.id,
          kind: news.kind,
          domain: news.domain,
          sourceTitle: news.source.title,
          sourceRegion: news.source.region,
          sourceDomain: news.source.domain,
          sourcePath: news.source.path,
          sourceType: news.source.type,
          title: news.title,
          publishedAt: news.published_at,
          slug: news.slug,
          url: news.url,
          createdAt: news.created_at,
        },
        update: {
          kind: news.kind,
          domain: news.domain,
          sourceTitle: news.source.title,
          sourceRegion: news.source.region,
          sourceDomain: news.source.domain,
          sourcePath: news.source.path,
          sourceType: news.source.type,
          title: news.title,
          publishedAt: news.published_at,
          slug: news.slug,
          url: news.url,
          createdAt: news.created_at,
        },
        where: {
          id: news.id,
        },
      })
    )
  );
}

export default async () => {
  console.log("Fetching latest news data...");
  try {
    await updateNews();
    console.log("News updated ");
  } catch (error) {
    console.error("News update failed ", error);
  }
};
