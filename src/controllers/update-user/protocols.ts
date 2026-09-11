import type { User } from "../../models/user.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}


export interface IUpdateUserController{
    handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>
}

export interface IUpdateUserRepository {
  updateUser(id: string,params: UpdateUserParams): Promise<User>;
}
