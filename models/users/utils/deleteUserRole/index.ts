import axios from 'axios';

import { getError } from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { UUID } from '@/models';

import { UserRole } from '../../types';

export interface DeleteUserRoleReturn {
  role: UserRole | null;
  error: Error | null;
}

export async function deleteUserRole(id: UUID): Promise<DeleteUserRoleReturn> {
  try {
    const response = await axios.delete<UserRole>(
      `${API_ENDPOINTS.USERS_ROLES}/${id}`
    );

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

export default deleteUserRole;
