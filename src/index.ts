import express, { type Express, type Request, type Response } from "express";
import { config } from "dotenv";

config();

const app: Express = express();

const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
