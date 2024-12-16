import jwt from "jsonwebtoken";
import { getjwtSecret } from "../config/env";

export const generateToken = (user: Object): string => {
  return jwt.sign(user, getjwtSecret(), {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, getjwtSecret());
};

export const generateOtp = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
}; 
