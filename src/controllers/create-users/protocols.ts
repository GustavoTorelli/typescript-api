import type { User } from "../../models/user.js";

export interface CreateUsersParams {
  firstName: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ICreateUsersRepository {
  createUser(params: CreateUsersParams): Promise<User>;
}
