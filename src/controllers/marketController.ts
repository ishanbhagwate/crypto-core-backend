import { Request, Response } from "express";

import axios from "axios";
import prisma from "../lib/prisma";

export const getAllCoins = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 100;

  const skip = (page - 1) * limit;

  try {
    const response = await prisma.cryptocurrency.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        cmcRank: "asc",
      },
      include: {
        quotes: true,
      },
    });

    res.status(200).json({
      message: "Successful",
      currentPage: page,
      data: response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch",
    });
  }
};

export const getCoinDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const response = await prisma.cryptocurrency.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        quotes: true,
      },
    });

    res.status(200).json({ message: "Successful", data: response });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: "Unable to fetch",
    });
  }
};

export const getOverview = async (req: Request, res: Response) => {
  try {
    //get global metrics
    const globalMetricsResp = await prisma.overview.findFirst({});

    res.status(200).json({
      message: "Successful",
      data: globalMetricsResp,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Unable to fetch",
    });
  }
};
