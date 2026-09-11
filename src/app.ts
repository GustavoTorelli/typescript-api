import express, { type Express, type Request, type Response } from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users.js";
import { MongoGetUsersRepository } from "./repo/get-users/mongo-get-users.js";
import { MongoClient } from "./database/mongo.js";
import { MongoCreateUserRepository } from "./repo/create-users/mongo-create-users.js";
import { CreateUserController } from "./controllers/create-users/create-users.js";
import { MongoUpdateUserRepository } from "./repo/update-user/mongo-update-user.js";
import { UpdateUserController } from "./controllers/update-user/update-user.js";
import { MongoDeleteUserRepository } from "./repo/delete-user/mongo-delete-user.js";
import { DeleteUserController } from "./controllers/delete-users/delete-users.js";

const main = async () => {
  config();

  const app: Express = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/users", async (req: Request, res: Response) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/users", async (req: Request, res: Response) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository,
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/users/:id", async (req: Request, res: Response) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();

    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository,
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/users/:id", async (req: Request, res: Response) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();

    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository,
    );

    const { body, statusCode } = await deleteUserController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
};

main();
