import { Request, Response } from "express";

export const getLatestNews = (req: Request, res: Response) => {
  res.json({ message: "News" });
};

export const getNewsById = (req: Request, res: Response) => {
  res.json({ message: "News DETAILS" });
};
