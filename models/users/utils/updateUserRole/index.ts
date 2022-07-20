import axios, { AxiosResponse } from 'axios';

import { getError } from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { UUID } from '@/models';

import { UserRole, UpdateUserRoleDto } from '../../types';

export interface UpdateUserRoleReturn {
  role: UserRole | null;
  error: Error | null;
}

export async function updateUserRole(
  id: UUID,
  data: UpdateUserRoleDto
): Promise<UpdateUserRoleReturn> {
  try {
    const response = await axios.put<
      UserRole,
      AxiosResponse<UserRole, UpdateUserRoleDto>,
      UpdateUserRoleDto
    >(`${API_ENDPOINTS.USERS_ROLES}/${id}`, data);

    return {
      role: response.data,
      error: null,
    };
  } catch (error) {
    return {
      role: null,
      error: getError(error),
    };
  }
}

export default updateUserRole;
