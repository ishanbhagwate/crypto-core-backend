import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";

import authRoutes from "./routes/authRoutes";
import marketRoutes from "./routes/marketRoutes";
import newsRoutes from "./routes/newsRoutes";
import searchRoutes from "./routes/searchRoutes";
import { authenticateToken } from "./middlewares/authMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/crypto", authenticateToken, marketRoutes);
app.use("/api/v1/news", authenticateToken, newsRoutes);
app.use("/api/v1/search", authenticateToken, searchRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
