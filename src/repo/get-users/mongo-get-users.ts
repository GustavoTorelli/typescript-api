import type { IGetUsersRepository } from "../../controllers/get-users/protocols.js";
import { MongoClient } from "../../database/mongo.js";
import type { User } from "../../models/user.js";
import type { MongoUser } from "../mongo-protocols.js";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
