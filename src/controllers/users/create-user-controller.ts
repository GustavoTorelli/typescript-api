import type { User } from "../../models/user.js";
import { badRequest, created, serverError } from "../helpers.js";
import type { HttpRequest, HttpResponse, IController } from "../protocols.js";
import validator from "validator";
import type {
  CreateUsersParams,
  ICreateUsersRepository,
} from "../../repositories/contracts/users/create-users.js";

// Create User COntroller
export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUsersRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUsersParams>,
  ): Promise<HttpResponse<User | string>> {
    try {
      //validar campos obrigatórios
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUsersParams]?.length) {
          return badRequest(`Fild ${field} is required `);
        }
      }

      //verificar se o email é válido
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("E-Mail is invalid.");
      }

      const user = await this.createUserRepository.createUser(httpRequest.body!);

      return created<User>(user);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
