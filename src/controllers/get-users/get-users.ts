import type { IController } from "../protocols.js";
import type { IGetUsersRepository } from "./protocols.js";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
