import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo.js";
import type { User } from "../../models/user.js";
import type {
  IupdateUserRepository,
  UpdateUserParams,
} from "../../controllers/update-user/protocols.js";

export class MongoUpdateUserRepository implements IupdateUserRepository {
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
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not updated");
    }

    const { _id, ...rest } = user;
    
    return { id: _id.toHexString(), ...rest };
  }
}
