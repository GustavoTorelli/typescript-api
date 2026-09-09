import type { IGetUsersRepository } from "../../controllers/get-users/protocols.js";
import type { User } from "../../models/user.js";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "g",
        lastname: "a",
        email: "a",
        password: "a",
      },
    ];
  }
}
