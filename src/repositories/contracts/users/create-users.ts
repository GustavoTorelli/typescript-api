import type { User } from "../../../models/user.js";

export interface CreateUsersParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUsersRepository {
  createUser(params: CreateUsersParams): Promise<User>;
}
