import axios, { AxiosResponse } from 'axios';

import { getError } from '@/utils';
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
    return {
      permission: null,
      error: getError(error),
    };
  }
}

export default updateUserRolePermission;
