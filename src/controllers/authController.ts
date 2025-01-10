import { Request, Response } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import {
  forgotPasswordSchema,
  loginSchema,
  signupSchema,
} from "../validations/authValidation";
import {
  generateOtp,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { getRefreshTokenJwtSecret } from "../config/env";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let isValidated = loginSchema.safeParse({ email, password });

    if (!isValidated.success) {
      res.status(401).json({
        messag: "Invalid email or password",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(401).json({
        messag: "Invalid credentials",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({
        messag: "Invalid credentials",
      });
      return;
    }

    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({ message: "Login successful", token, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  //delete refresh token
  const { id } = req.body;

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken: null,
      },
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const refresh = async (req: Request, res: Response) => {
  //refresh token
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(403).json({
      message: "Refresh token not provided",
    });
    return;
  }

  jwt.verify(
    refreshToken,
    getRefreshTokenJwtSecret(),
    (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const newAccessToken = generateAccessToken(user);
      res.status(200).json({
        message: "Refresh token successful",
        token: newAccessToken,
      });
    }
  );
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, username, name } = req.body;

  try {
    //validations
    const validatedFields = signupSchema.safeParse({
      email,
      password,
      name,
      username,
    });

    if (!validatedFields.success) {
      res.status(401).json({
        messag: "Invalid fields",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      res.status(401).json({
        message: "Email already in use.",
      });
      return;
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        username,
      },
    });

    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      message: "User created",
      data: user,
      token,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    //find if user exists
    const validatedFields = forgotPasswordSchema.safeParse({
      email,
    });

    if (!validatedFields.success) {
      res.status(401).json({
        messag: "Invalid fields",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(401).json({
        messag: "Invalid credentials",
      });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_BREVO_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_BREVO_USER,
        pass: process.env.SMTP_BREVO_PASS,
      },
    });

    const resetToken = generateOtp();
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 10);

    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    //send email
    await transporter.sendMail({
      from: '"CryptoCore" <no-reply@ishanbhagwate.com>',
      to: email,
      subject: "Password Reset Requested",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password OTP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
        }

        .email-header {
            text-align: center;
            background-color: #007bff;
            color: white;
            padding: 10px 0;
            border-radius: 8px 8px 0 0;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
        }

        .otp {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            background-color: #f9f9f9;
            border: 1px dashed #007bff;
            padding: 10px;
            margin: 20px 0;
            color: #007bff;
        }

        .email-footer {
            text-align: center;
            font-size: 14px;
            color: #666;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Reset Your Password</h1>
        </div>

        <div class="email-body">
            <p>Hello ${user.name},</p>
            <p>You have requested to reset your password. Use the OTP below to complete the process:</p>

            <div class="otp">${resetToken}</div>

            <p>If you did not make this request, you can safely ignore this email.</p>
            <p>This OTP will expire in 10 minutes.</p>

            <p>Best regards,</p>
            <p><strong>CryptoCore</strong></p>
        </div>

        <div class="email-footer">
            <p>If you have any issues, please contact our support team.</p>
        </div>
    </div>
</body>
</html>
`,
    });

    res.status(200).json({ message: "Password reset OTP sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, resetToken, newPassword } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        resetToken: resetToken,
        resetTokenExpiry: {
          gte: new Date(),
        },
      },
    });

    if (!existingUser) {
      res.status(401).json({
        messag: "Invalid or expired otp",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.status(200).json({
      message: "Password reset complete",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
