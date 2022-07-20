import axios from 'axios';

import { getError } from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { UUID } from '@/models';

import { UserRolePermission } from '../../types';

export interface DeleteUserRolePermissionReturn {
  permission: UserRolePermission | null;
  error: Error | null;
}

export async function deleteUserRolePermission(
  id: UUID
): Promise<DeleteUserRolePermissionReturn> {
  try {
    const response = await axios.delete<UserRolePermission>(
      `${API_ENDPOINTS.USERS_ROLES_PERMISSIONS}/${id}`
    );

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

export default deleteUserRolePermission;
