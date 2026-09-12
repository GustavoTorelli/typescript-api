import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo.js";
import type { User } from "../../../models/user.js";
import type { IGetUserByIdRepository } from "../../contracts/users/get-user-by-id.js";
import type { MongoUser } from "../mongo-protocols.js";

export class MongoGetUserByIdRepository implements IGetUserByIdRepository {
  async getUserById(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found");
    }
    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
