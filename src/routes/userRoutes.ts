import express, { type Request, type Response } from "express";
import { GetUsersController } from "../controllers/users/get-users-controller.js";
import { CreateUserController } from "../controllers/users/create-user-controller.js";
import { UpdateUserController } from "../controllers/users/update-user-controller.js";
import { DeleteUserController } from "../controllers/users/delete-user-controller.js";
import { MongoCreateUserRepository } from "../repositories/mongodb/users/mongo-create-users.js";
import { MongoDeleteUserRepository } from "../repositories/mongodb/users/mongo-delete-user.js";
import { MongoGetUsersRepository } from "../repositories/mongodb/users/mongo-get-users.js";
import { MongoUpdateUserRepository } from "../repositories/mongodb/users/mongo-update-user.js";
import { MongoGetUserByIdRepository } from "../repositories/mongodb/users/mongo-get-users-by-id.js";
import { GetUserByIdController } from "../controllers/users/get-users-by-id.js";

const router = express.Router();

// Get User Route
router.get("", async (req: Request, res: Response) => {
  const repository = new MongoGetUsersRepository();

  const controller = new GetUsersController(repository);

  const { body, statusCode } = await controller.handle();

  res.status(statusCode).send(body);
});

// Get user by id route
router.get("/:id", async (req: Request, res: Response) => {
  const repository = new MongoGetUserByIdRepository();

  const controller = new GetUserByIdController(repository);

  const { body, statusCode } = await controller.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

// Create  User Route
router.post("", async (req: Request, res: Response) => {
  const repository = new MongoCreateUserRepository();

  const controller = new CreateUserController(repository);

  const { body, statusCode } = await controller.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

// Update User Route
router.patch("/:id", async (req: Request, res: Response) => {
  const repository = new MongoUpdateUserRepository();

  const controller = new UpdateUserController(repository);

  const { body, statusCode } = await controller.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

// Delete User Route
router.delete("/:id", async (req: Request, res: Response) => {
  const repository = new MongoDeleteUserRepository();

  const controller = new DeleteUserController(repository);

  const { body, statusCode } = await controller.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default router;
