import axios, { AxiosError } from 'axios';

import {
  checkAndReturnApiErrorResponse,
  UnexpectedError,
  ApiError,
} from '@/utils';
import { API_ENDPOINTS } from '@/config';

export interface ChangePasswordReturn {
  error: Error | null;
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<ChangePasswordReturn> {
  try {
    await axios.put(API_ENDPOINTS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
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

export default changePassword;
