import type { User } from "../../../models/user.js";

export interface IGetUserByEmailRepository {
  getUserByEmail(email: string): Promise<User | null>;
  
}
