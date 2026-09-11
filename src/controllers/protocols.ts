export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export interface IController {
  handle(httRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
