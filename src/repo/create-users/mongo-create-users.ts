import type {
  CreateUsersParams,
  ICreateUsersRepository,
} from "../../controllers/create-users/protocols.js";
import { MongoClient } from "../../database/mongo.js";
import type { User } from "../../models/user.js";

export class MongoCreateUserRepository implements ICreateUsersRepository {
  async createUser(params: CreateUsersParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
