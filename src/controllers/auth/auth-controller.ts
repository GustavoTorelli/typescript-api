import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { IGetUserByEmailRepository } from "../../repositories/contracts/users/get-user-by-email.js";
import { badRequest, ok, serverError, unauthorized } from "../helpers.js";
import type { HttpRequest, HttpResponse, IController } from "../protocols.js";
import type { AuthParams } from "../../repositories/contracts/auth/auth.js";

export class AuthController implements IController {
  constructor(
    private readonly getUserByEmailRepository: IGetUserByEmailRepository,
  ) {}
  async handle(
    httRequest: HttpRequest<AuthParams>,
  ): Promise<HttpResponse<{ token: string } | string>> {
    try {
      const email = httRequest.body?.email;
      const password = httRequest.body?.password;

      if (!email?.trim() || !password) {
        return badRequest("E-Mail and password is required!");
      }

      const user = await this.getUserByEmailRepository.getUserByEmail(email);

      if (!user) {
        return unauthorized("E-Mail or password is invalid!");
      }

      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        return unauthorized("Password is invalid!");
      }

      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error("JWT_SECRET is not defined!");
      }

      const token = jwt.sign({}, secret, {
        subject: user.id,
        expiresIn: "5h",
        algorithm: "HS256",
      });

      return ok<{ token: string }>({ token });
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
