import type { User } from "../../models/user.js";
import type { MongoUpdateUserRepository } from "../../repo/update-user/mongo-update-user.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";
import type { IUpdateUserController, UpdateUserParams } from "./protocols.js";

export class UpdateUserController implements IUpdateUserController {
  constructor(
    private readonly updateUserRepository: MongoUpdateUserRepository,
  ) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
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
        return {
          statusCode: 400,
          body: "Some received field is not allowed",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
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
