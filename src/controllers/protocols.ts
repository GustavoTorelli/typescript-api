export interface HttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T;
}

export interface HttpRequest<B> {
  params?: {
    id?: string;
  };
  headers?: unknown;
  body?: B;
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export interface IController {
  handle(httRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
