import validator from 'validator'
import type { User } from "../../models/user.js";
import type { HttpRequest, HttpResponse, IController } from "../protocols.js";
import type {
  CreateUsersParams,
  ICreateUsersRepository,
} from "./protocols.js";

export class CreateUserController implements IController {
  constructor(private readonly crateUserRepository: ICreateUsersRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUsersParams>,
  ): Promise<HttpResponse<User>> {
    try {
      //validar campos obrigatórios
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUsersParams]?.length) {
          return {
            statusCode: 400,
            body: `Fild ${field} is required `,
          };
        }
      }

      //verificar se o email é válido
      const emailIsValid = validator.isEmail(httpRequest.body!.email)

      if (!emailIsValid){
        return{
          statusCode: 400,
          body: 'Email is invalid.'
        }
      }

      const user = await this.crateUserRepository.createUser(httpRequest.body!);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
