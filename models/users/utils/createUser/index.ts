import axios, { AxiosResponse, AxiosError } from 'axios';

import {
  checkAndReturnApiErrorResponse,
  UnexpectedError,
  ApiError,
} from '@/utils';
import { API_ENDPOINTS } from '@/config';

import { User, CreateUserDto } from '../../types';

export interface CreateUserReturn {
  user: User | null;
  error: Error | null;
}

export async function createUser(
  data: CreateUserDto
): Promise<CreateUserReturn> {
  try {
    const response = await axios.post<
      User,
      AxiosResponse<User, CreateUserDto>,
      CreateUserDto
    >(API_ENDPOINTS.USERS, data);

    return {
      user: response.data,
      error: null,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = checkAndReturnApiErrorResponse(error.response?.data);

      return {
        user: null,
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
      user: null,
      error: error instanceof Error ? error : new UnexpectedError(),
    };
  }
}

export default createUser;
