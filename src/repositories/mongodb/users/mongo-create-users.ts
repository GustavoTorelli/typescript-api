import { MongoClient } from "../../../database/mongo.js";
import type { User } from "../../../models/user.js";
import type {
  ICreateUsersRepository,
  CreateUsersParams,
} from "../../contracts/users/create-users.js";
import type { MongoUser } from "../mongo-protocols.js";

export class MongoCreateUserRepository implements ICreateUsersRepository {
  async createUser(params: CreateUsersParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
