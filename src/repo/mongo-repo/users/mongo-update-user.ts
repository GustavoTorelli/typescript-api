import type { User } from "../../../models/user.js";
import type { MongoUser } from "../mongo-protocols.js";
import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo.js";
import type {
  IUpdateUserRepository,
  UpdateUserParams,
} from "../../contracts/users/update-user.js";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    await MongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      },
    );

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not updated");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
