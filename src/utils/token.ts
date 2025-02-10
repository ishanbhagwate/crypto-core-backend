import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {
  getAccessTokenJwtSecret,
  getRefreshTokenJwtSecret,
} from "../config/env";
import { User } from "@prisma/client";

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, getAccessTokenJwtSecret(), {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, getRefreshTokenJwtSecret(), {
    expiresIn: "7d",
  });
};

export const generateOtp = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  let isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export const verifyRefreshToken = async (
  refreshToken: string,
  hashedRefreshToken: string
): Promise<boolean> => {
  let isMatch = await bcrypt.compare(refreshToken, hashedRefreshToken);
  return isMatch;
};

export const getUserId = async (
  refreshToken: string
): Promise<string | null> => {
  const decoded = jwt.decode(refreshToken);

  if (decoded && typeof decoded === "object" && "userId" in decoded) {
    return decoded.userId as string;
  }

  return null;
};
