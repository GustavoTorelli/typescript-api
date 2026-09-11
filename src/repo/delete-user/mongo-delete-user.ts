import { ObjectId } from "mongodb";
import type { IDeleteUserRepository } from "../../controllers/delete-users/protocols.js";
import { MongoClient } from "../../database/mongo.js";
import type { User } from "../../models/user.js";
import type { MongoUser } from "../mongo-protocols.js";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("User not deleted   ");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
