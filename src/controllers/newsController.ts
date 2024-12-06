import { Request, Response } from "express";
import { CRYPTO_PANIC_NEWS_API_URL } from "../config/cronConfig";
import axios from "axios";
import prisma from "../lib/prisma";

export const getLatestNews = async (req: Request, res: Response) => {
  try {
    const response = await prisma.news.findMany({
      orderBy: {
        publishedAt: "desc",
      },
      take: 100,
    });

    res.status(200).json({ message: "Successful", data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch news",
    });
  }
};

export const getNewsById = (req: Request, res: Response) => {
  res.json({ message: "News DETAILS" });
};
