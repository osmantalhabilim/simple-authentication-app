import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();
const _PORT = process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))

app.use("/api/auth", authRoutes);

app.listen(_PORT, () => {
    console.log("server is running on " + _PORT);
    connectDB();
})