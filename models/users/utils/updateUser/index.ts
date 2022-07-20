import axios, { AxiosResponse } from 'axios';

import { getError } from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { UUID } from '@/models';

import { User, UpdateUserDto } from '../../types';

export interface UpdateUserReturn {
  user: User | null;
  error: Error | null;
}

export async function updateUser(
  id: UUID,
  data: UpdateUserDto
): Promise<UpdateUserReturn> {
  try {
    const response = await axios.put<
      User,
      AxiosResponse<User, UpdateUserDto>,
      UpdateUserDto
    >(`${API_ENDPOINTS.USERS}/${id}`, data);

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

export default updateUser;
