import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { z as zod } from 'zod';

import { ApiError } from '@/utils';

export type ApiErrorInfo = {
  status: StatusCodes;
  message: string;
  code?: number | string;
};

export interface ApiErrorResponse {
  error: ApiErrorInfo;
}

export function createApiErrorResponse(error: unknown): ApiErrorResponse {
  if (error instanceof ApiError) {
    return {
      error: {
        status: error.status,
        message: error.message,
        code: error.code,
      },
    };
  }

  return {
    error: {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message:
        error instanceof Error
          ? error.message
          : ReasonPhrases.INTERNAL_SERVER_ERROR,
    },
  };
}

export function checkAndReturnApiErrorResponse(
  response: unknown
): ApiErrorResponse | null {
  const validator = zod
    .object({
      error: zod.object({
        status: zod.number(),
        message: zod.string(),
        code: zod.number().or(zod.string()).optional(),
      }),
    })
    .safeParse(response);

  return validator.success ? validator.data : null;
}

export default createApiErrorResponse;
