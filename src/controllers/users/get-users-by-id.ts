import type { User } from "../../models/user.js";
import type { IGetUserByIdRepository } from "../../repositories/contracts/users/get-user-by-id.js";
import { badRequest, ok, serverError } from "../helpers.js";
import type { HttpRequest, HttpResponse, IController } from "../protocols.js";

export class GetUserByIdController implements IController {
  constructor(private readonly getUserByIdRepository: IGetUserByIdRepository) {}
  async handle(
    httRequest: HttpRequest<unknown>,
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id");
      }

      const user = await this.getUserByIdRepository.getUserById(id);

      if (!user) {
        return badRequest("User not found.");
      }
      return ok<User>(user);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
