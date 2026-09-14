import type { User } from "../../models/user.js";
import { badRequest, conflict, created, serverError } from "../helpers.js";
import type { HttpRequest, HttpResponse, IController } from "../protocols.js";
import validator from "validator";
import type {
  CreateUsersParams,
  ICreateUsersRepository,
} from "../../repositories/contracts/users/create-users.js";
import type { IGetUserByEmailRepository } from "../../repositories/contracts/users/get-user-by-email.js";
import bcrypt from "bcrypt";

// Create User COntroller
export class CreateUserController implements IController {
  constructor(
    private readonly createUserRepository: ICreateUsersRepository,
    private readonly getUserByEmailRepository: IGetUserByEmailRepository,
  ) {}
  async handle(
    httpRequest: HttpRequest<CreateUsersParams>,
  ): Promise<HttpResponse<User | string>> {
    try {
      //required Fields
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUsersParams]?.length) {
          return badRequest(`Fild ${field} is required `);
        }
      }

      // email validator
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("E-Mail is invalid.");
      }

      const email = httpRequest.body!.email.toLowerCase().trim();
      const existingUser = await this.getUserByEmailRepository.getUserByEmail(email);

      if (existingUser) {
        return conflict("E-Mail is invalid.");
      }

      const passwordIsStrong = validator.isStrongPassword(
        httpRequest.body!.password,
        {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        },
      );

      if (!passwordIsStrong) {
        return badRequest(
          "Password required: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, ",
        );
      }

      const passwordHash = await bcrypt.hash(httpRequest.body!.password, 12);

      const user = await this.createUserRepository.createUser({
        ...httpRequest.body!,
        email,
        password: passwordHash,
      });

      return created<User>(user);
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 11000
      ) {
        return conflict("E-mail já está em uso.");
      }

      console.error(error);
      return serverError();
    }
  }
}
