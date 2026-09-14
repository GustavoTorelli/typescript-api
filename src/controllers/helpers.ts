import { HttpStatusCode, type HttpResponse } from "./protocols.js";

export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body,
});

export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.CREATED,
  body,
});

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const unauthorized = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.UNAUTHORIZED,
    body: message,
  };
};

export const forbidden = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.FORBIDDEN,
    body: message,
  };
};

export const notFound = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.NOT_FOUND,
    body: "Not Found.",
  };
};

export const conflict = (message: string): HttpResponse<string> => ({
  statusCode: HttpStatusCode.CONFLICT,
  body: message,
});

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: "Something went wrong.",
  };
};
