import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const searchCoins = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as String;

    if (search.length <= 1) {
      res.status(200).json({
        message: "Successful",
        data: [],
      });
    } else {
      const resp = await prisma.cryptocurrency.findMany({
        where: {
          slug: {
            contains: search?.toString().toLowerCase(),
          },
        },
        orderBy: {
          cmcRank: "asc",
        },
      });

      res.status(200).json({
        message: "Successful",
        data: resp,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to search",
    });
  }
};
