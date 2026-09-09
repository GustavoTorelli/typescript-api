import express, { type Express, type Request, type Response } from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users.js";
import { MongoGetUsersRepository } from "./repo/get-users/mongo-get-users.js";

config();

const app: Express = express();

const port = process.env.PORT || 8000;

app.get("/users", async (req: Request, res: Response) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const {body, statusCode} = await  getUsersController.handle()

  res.send(body).status(statusCode)

});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
