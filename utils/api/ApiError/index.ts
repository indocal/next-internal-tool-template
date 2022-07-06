import { StatusCodes } from 'http-status-codes';

export type ApiErrorConstructor = {
  status: StatusCodes;
  message: string;
  code?: number | string;
  options?: ErrorOptions;
};

export class ApiError extends Error {
  readonly status: StatusCodes;
  readonly code?: number | string;

  constructor(constructor: ApiErrorConstructor) {
    super(constructor.message, constructor?.options);

    this.status = constructor.status;
    this.code = constructor.code;
  }
}

export default ApiError;
