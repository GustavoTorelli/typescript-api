import type { User } from "../models/user.js";
import { badRequest, created, ok, serverError } from "./helpers.js";
import type { HttpRequest, HttpResponse, IController } from "./protocols.js";
import type { IGetUsersRepository } from "../repo/contracts/users/get-users.js";
import type {
  CreateUsersParams,
  ICreateUsersRepository,
} from "../repo/contracts/users/create-users.js";
import validator from "validator";
import type { UpdateUserParams } from "../repo/contracts/users/update-user.js";
import type { MongoUpdateUserRepository } from "../repo/mongo-repo/users/mongo-update-user.js";
import type { IDeleteUserRepository } from "../repo/contracts/users/delete-users.js";

// Get Users Controller
export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok<User[]>(users);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}

// Create User COntroller
export class CreateUserController implements IController {
  constructor(private readonly crateUserRepository: ICreateUsersRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUsersParams>,
  ): Promise<HttpResponse<User | string>> {
    try {
      //validar campos obrigatórios
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUsersParams]?.length) {
          return badRequest(`Fild ${field} is required `);
        }
      }

      //verificar se o email é válido
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("E-Mail is invalid.");
      }

      const user = await this.crateUserRepository.createUser(httpRequest.body!);

      return created<User>(user);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}

// Update User Controller
export class UpdateUserController implements IController {
  constructor(
    private readonly updateUserRepository: MongoUpdateUserRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserParams>,
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing Fields");
      }

      if (!id) {
        return badRequest("Missing user id");
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams),
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const user = await this.updateUserRepository.updateUser(id, body);
      return ok<User>(user);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}

// Delete User Controller
export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id");
      }

      const user = await this.deleteUserRepository.deleteUser(id);
      return ok<User>(user);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}

