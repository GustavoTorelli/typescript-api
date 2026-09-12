import type { User } from "../../../models/user.js";

export interface IGetUserByIdRepository {
  getUserById(id: string): Promise<User>;
}
