import axios, { AxiosResponse, AxiosError } from 'axios';

import {
  checkAndReturnApiErrorResponse,
  UnexpectedError,
  ApiError,
} from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { UUID } from '@/models';

import { User, UpdateUserDto } from '../../types';

export interface UpdateUserReturn {
  user: User | null;
  error: Error | null;
}

export async function updateUser(
  id: UUID,
  data: UpdateUserDto
): Promise<UpdateUserReturn> {
  try {
    const response = await axios.put<
      User,
      AxiosResponse<User, UpdateUserDto>,
      UpdateUserDto
    >(`${API_ENDPOINTS.USERS}/${id}`, data);

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

export default updateUser;
