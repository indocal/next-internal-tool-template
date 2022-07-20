import axios, { AxiosResponse } from 'axios';

import { getError } from '@/utils';
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
    return {
      permission: null,
      error: getError(error),
    };
  }
}

export default createUserRolePermission;
