import type { User } from "../../models/user.js";

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string,params: UpdateUserParams): Promise<User>;
}
