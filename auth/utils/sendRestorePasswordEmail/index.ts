import axios, { AxiosError } from 'axios';

import {
  checkAndReturnApiErrorResponse,
  UnexpectedError,
  ApiError,
} from '@/utils';
import { API_ENDPOINTS } from '@/config';

export interface SendRestorePasswordEmailReturn {
  error: Error | null;
}

export async function sendRestorePasswordEmail(
  email: string
): Promise<SendRestorePasswordEmailReturn> {
  try {
    await axios.post(API_ENDPOINTS.RESTORE_PASSWORD, {
      email,
    });

    return {
      error: null,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = checkAndReturnApiErrorResponse(error.response?.data);

      return {
        error: response
          ? new ApiError({
              status: response.error.status,
              message: response.error.message,
              code: response.error.code,
              options: { cause: error },
            })
          : error,
      };
    }

    return {
      error: error instanceof Error ? error : new UnexpectedError(),
    };
  }
}

export default sendRestorePasswordEmail;
