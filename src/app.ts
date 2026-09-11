import { config } from "dotenv";
import express, { type Express } from "express";
import { MongoClient } from "./database/mongo.js";

// Routes
import userRoutes from "./routes/userRoutes.js";

const main = async () => {
  config();

  const app: Express = express();

  app.use(express.json());
  
  app.use("/users", userRoutes);

  await MongoClient.connect();

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
};

main();
