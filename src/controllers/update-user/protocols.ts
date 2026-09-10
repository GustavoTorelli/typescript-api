import type { User } from "../../models/user.js";

export interface UpdateUserParams {
  firstName?: string;
  lastname?: string;
  password?: string;
}

export interface IupdateUserRepository {
  updateUser(id: string,params: UpdateUserParams): Promise<User>;
}
