import dotenv from "dotenv";
dotenv.config();

export const config = {
  databaseUrl: "mongodb://localhost:27017/airbnb-mern",
  secret: process.env.SECRET || "mysecret",
  port: process.env.PORT || 8000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
};
