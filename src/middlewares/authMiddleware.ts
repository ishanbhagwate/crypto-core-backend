import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getjwtSecret } from "../config/env";

interface AuthenticationRequest extends Request {
  user?: JwtPayload | string;
}

export const authenticateToken = (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied, no token provided" });
    return;
  }

  try {
    jwt.verify(token, getjwtSecret(), async (error, payload) => {
      if (error) return res.status(403).json({ message: "Invalid token" });

      if (typeof payload === "object" && payload !== null && "id" in payload) {
        req.user = (payload as JwtPayload).id;
        next();
      } else {
        return res.status(403).json({ message: "Invalid token" });
      }
    });
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {}
};
