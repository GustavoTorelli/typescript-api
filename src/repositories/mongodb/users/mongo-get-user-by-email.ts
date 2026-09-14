import { MongoClient } from "../../../database/mongo.js";
import type { User } from "../../../models/user.js";
import type { IGetUserByEmailRepository } from "../../contracts/users/get-user-by-email.js";
import type { MongoUser } from "../mongo-protocols.js";

export class MongoGetUserByEmailRepository implements IGetUserByEmailRepository {
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
