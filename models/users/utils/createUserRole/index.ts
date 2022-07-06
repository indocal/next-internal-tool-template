import axios, { AxiosResponse, AxiosError } from 'axios';

import {
  checkAndReturnApiErrorResponse,
  UnexpectedError,
  ApiError,
} from '@/utils';
import { API_ENDPOINTS } from '@/config';

import { UserRole, CreateUserRoleDto } from '../../types';

export interface CreateUserRoleReturn {
  role: UserRole | null;
  error: Error | null;
}

export async function createUserRole(
  data: CreateUserRoleDto
): Promise<CreateUserRoleReturn> {
  try {
    const response = await axios.post<
      UserRole,
      AxiosResponse<UserRole, CreateUserRoleDto>,
      CreateUserRoleDto
    >(API_ENDPOINTS.USERS_ROLES, data);

    return {
      role: response.data,
      error: null,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = checkAndReturnApiErrorResponse(error.response?.data);

      return {
        role: null,
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
      role: null,
      error: error instanceof Error ? error : new UnexpectedError(),
    };
  }
}

export default createUserRole;
