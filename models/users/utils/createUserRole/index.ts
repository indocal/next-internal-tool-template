import axios, { AxiosResponse } from 'axios';

import { getError } from '@/utils';
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
    return {
      role: null,
      error: getError(error),
    };
  }
}

export default createUserRole;
