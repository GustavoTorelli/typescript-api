import express, { type Request, type Response } from "express";
import { MongoGetUserByEmailRepository } from "../repositories/mongodb/users/mongo-get-user-by-email.js";
import { AuthController } from "../controllers/auth/auth-controller.js";

const router = express.Router();

router.post("/auth", async (req: Request, res: Response) => {
  const repository = new MongoGetUserByEmailRepository();
  const controller = new AuthController(repository);

  const { body, statusCode } = await controller.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);

//   res.cookie("access_token", body.token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "lax",
//   maxAge: 5 * 60 * 60 * 1000,
//   path: "/",
// });

res.status(200).json({ message: "Login is sucefull!" });
});

export default router;