import type { User } from "../../models/user.js";
import { badRequest, created, serverError } from "../helpers.js";
import type { HttpRequest, HttpResponse, IController } from "../protocols.js";
import validator from "validator";
import type {
  CreateUsersParams,
  ICreateUsersRepository,
} from "../../repositories/contracts/users/create-users.js";
import bcrypt from "bcrypt";

// Create User COntroller
export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUsersRepository) {}
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
      
      const passwordHash = await bcrypt.hash(httpRequest.body!.password, 12);

      const user = await this.createUserRepository.createUser({
        ...httpRequest.body!,
        password: passwordHash,
      });

      return created<User>(user);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
