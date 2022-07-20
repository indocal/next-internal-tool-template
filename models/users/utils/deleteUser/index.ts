import axios from 'axios';

import { getError } from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { UUID } from '@/models';

import { User } from '../../types';

export interface DeleteUserReturn {
  user: User | null;
  error: Error | null;
}

export async function deleteUser(id: UUID): Promise<DeleteUserReturn> {
  try {
    const response = await axios.delete<User>(`${API_ENDPOINTS.USERS}/${id}`);

    return {
      user: response.data,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: getError(error),
    };
  }
}

export default deleteUser;
