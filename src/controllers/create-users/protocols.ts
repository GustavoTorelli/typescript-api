import type { User } from "../../models/user.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";


export interface ICreateUsersController{
    handle(httpRequest: HttpRequest<CreateUsersParams>): Promise<HttpResponse<User>>
}

export interface CreateUsersParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUsersRepository {
  createUser(params: CreateUsersParams): Promise<User>;
}
