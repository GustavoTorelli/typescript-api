import express, { type Express, type Request, type Response } from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users.js";
import { MongoGetUsersRepository } from "./repo/get-users/mongo-get-users.js";
import { MongoClient } from "./database/mongo.js";

const main = async () => {
  config();
  const app: Express = express();

  await MongoClient.connect();

  app.get("/users", async (req: Request, res: Response) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
};

  main();
