import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRoute from "./routes/userRoute";
import placeRoute from "./routes/placeRoute";
import { config } from "./config/config";
import cookieParser from "cookie-parser";
import path from "path";

// Create express app
const app: Express = express();
const currentDir = __dirname; // gets the current directory
const parentDir = path.join(currentDir, "..");
// Use dotenv to allow use of .env files
dotenv.config();

// // Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: config.clientUrl,
  })
);
app.use(morgan("tiny"));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(parentDir + "/uploads")));

// // Routes
app.use("/", userRoute);
app.use("/", placeRoute);

// Connect to mongo
mongoose
  .connect(config.databaseUrl)
  .then((data) => {
    console.log("mongodb connected");
    // Start the server
    app.listen(8000, () => {
      console.log(
        `[server]:  Server is running at http://localhost:${config.port}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
