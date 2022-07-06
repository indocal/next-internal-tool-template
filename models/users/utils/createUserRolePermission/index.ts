import axios, { AxiosResponse, AxiosError } from 'axios';
import {
  checkAndReturnApiErrorResponse,
  UnexpectedError,
  ApiError,
} from '@/utils';
import { API_ENDPOINTS } from '@/config';

import { UserRolePermission, CreateUserRolePermissionDto } from '../../types';

export interface CreateUserRolePermissionReturn {
  permission: UserRolePermission | null;
  error: Error | null;
}

export async function createUserRolePermission(
  data: CreateUserRolePermissionDto
): Promise<CreateUserRolePermissionReturn> {
  try {
    const response = await axios.post<
      UserRolePermission,
      AxiosResponse<UserRolePermission, CreateUserRolePermissionDto>,
      CreateUserRolePermissionDto
    >(API_ENDPOINTS.USERS_ROLES_PERMISSIONS, data);

    return {
      permission: response.data,
      error: null,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = checkAndReturnApiErrorResponse(error.response?.data);

      return {
        permission: null,
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
      permission: null,
      error: error instanceof Error ? error : new UnexpectedError(),
    };
  }
}

export default createUserRolePermission;
