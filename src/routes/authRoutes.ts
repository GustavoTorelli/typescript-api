import express, { type Request, type Response } from "express";
import { MongoGetUserByEmailRepository } from "../repositories/mongodb/users/mongo-get-user-by-email.js";
import { AuthController } from "../controllers/auth/auth-controller.js";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const repository = new MongoGetUserByEmailRepository();
  const controller = new AuthController(repository);

  const { body, statusCode } = await controller.handle({
    body: req.body,
  });

  if (statusCode !== 200 || typeof body === "string") {
    res.status(statusCode).send(body);
    return;
  }

  res.cookie("access_token", body.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 5 * 60 * 60 * 1000,
    path: "/",
  });

  res.status(200).json({ message: "Login realizado!" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({ message: "Logout!" });
});

export default router;
