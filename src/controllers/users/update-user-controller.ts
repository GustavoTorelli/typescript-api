import type { User } from "../../models/user.js";
import { badRequest, ok, serverError } from "../helpers.js";
import type { HttpRequest, HttpResponse, IController } from "../protocols.js";
import type {
  IUpdateUserRepository,
  UpdateUserParams,
} from "../../repositories/contracts/users/update-user.js";

// Update User Controller
export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserParams>,
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing Fields");
      }

      if (!id) {
        return badRequest("Missing user id");
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams),
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const user = await this.updateUserRepository.updateUser(id, body);
      return ok<User>(user);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
