import type { User } from "../../models/user.js";
import { badRequest, ok, serverError } from "../helpers.js";
import type { HttpRequest, HttpResponse, IController } from "../protocols.js";
import type { IDeleteUserRepository } from "./protocols.js";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id");
      }

      const user = await this.deleteUserRepository.deleteUser(id);
      return ok<User>(user);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
