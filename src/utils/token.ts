import jwt from "jsonwebtoken";
import {
  getAccessTokenJwtSecret,
  getRefresgTokenJwtSecret,
} from "../config/env";
import { User } from "@prisma/client";

export const generateAccessToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email },
    getAccessTokenJwtSecret(),
    {
      expiresIn: "15m",
    }
  );
};

export const generateRefreshToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email },
    getRefresgTokenJwtSecret(),
    {
      expiresIn: "7d",
    }
  );
};

export const generateOtp = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};
