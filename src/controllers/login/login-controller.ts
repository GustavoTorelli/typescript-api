import bcrypt from "bcrypt";
import type { LoginParams } from "../../repositories/contracts/login/login.js";
import type { IGetUserByEmailRepository } from "../../repositories/contracts/users/get-user-by-email.js";
import { badRequest, ok, serverError, unauthorized } from "../helpers.js";
import type { HttpRequest, HttpResponse, IController } from "../protocols.js";

export class LoginController implements IController {
  constructor(
    private readonly getUserByEmailRepository: IGetUserByEmailRepository,
  ) {}
  async handle(
    httRequest: HttpRequest<LoginParams>,
  ): Promise<HttpResponse<string>> {
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

      return ok("Credentials ok!");
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
