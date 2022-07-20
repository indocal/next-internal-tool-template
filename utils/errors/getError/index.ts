import { AxiosError } from 'axios';

import {
  checkAndReturnApiErrorResponse,
  ApiError,
  UnexpectedError,
} from '@/utils';

export function getError(error: unknown): Error {
  if (error instanceof AxiosError) {
    const response = checkAndReturnApiErrorResponse(error.response?.data);

    return response
      ? new ApiError({
          status: response.error.status,
          message: response.error.message,
          code: response.error.code,
          options: { cause: error },
        })
      : error;
  }

  return error instanceof Error ? error : new UnexpectedError();
}

export default getError;
