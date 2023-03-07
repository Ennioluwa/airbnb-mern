import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("New express with typescript included server");
});

app.listen(port, () => {
  console.log(
    `[server]: A new typescript Server is running at http://localhost:${port}`
  );
});
