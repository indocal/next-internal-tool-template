import axios, { AxiosResponse, AxiosError } from 'axios';

import {
  checkAndReturnApiErrorResponse,
  UnexpectedError,
  ApiError,
} from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { UUID } from '@/models';

import { UserRolePermission, UpdateUserRolePermissionDto } from '../../types';

export interface UpdateUserRolePermissionReturn {
  permission: UserRolePermission | null;
  error: Error | null;
}

export async function updateUserRolePermission(
  id: UUID,
  data: UpdateUserRolePermissionDto
): Promise<UpdateUserRolePermissionReturn> {
  try {
    const response = await axios.put<
      UserRolePermission,
      AxiosResponse<UserRolePermission, UpdateUserRolePermissionDto>,
      UpdateUserRolePermissionDto
    >(`${API_ENDPOINTS.USERS_ROLES_PERMISSIONS}/${id}`, data);

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

export default updateUserRolePermission;
