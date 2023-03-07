import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const clientUrl = process.env.CLIENT_URL;
const app: Express = express();
app.use(
  cors({
    credentials: true,
    origin: clientUrl,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("New express with typescript included server");
});

app.listen(port, () => {
  console.log(
    `[server]: A new typescript Server is running at http://localhost:${port}`
  );
});
