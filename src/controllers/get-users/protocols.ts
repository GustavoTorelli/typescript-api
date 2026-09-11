import type { User } from "../../models/user.js";

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}
