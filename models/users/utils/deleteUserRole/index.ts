import axios, { AxiosError } from 'axios';

import {
  checkAndReturnApiErrorResponse,
  UnexpectedError,
  ApiError,
} from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { UUID } from '@/models';

import { UserRole } from '../../types';

export interface DeleteUserRoleReturn {
  role: UserRole | null;
  error: Error | null;
}

export async function deleteUserRole(id: UUID): Promise<DeleteUserRoleReturn> {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.USERS_ROLES}/${id}`);

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

export default deleteUserRole;
