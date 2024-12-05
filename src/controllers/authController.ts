import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  res.json({ message: "Login successful" });
};

export const signup = (req: Request, res: Response) => {
  res.json({ message: "Signup successful" });
};

export const forgotPassword = (req: Request, res: Response) => {
  res.json({ message: "Forgot Password" });
};
