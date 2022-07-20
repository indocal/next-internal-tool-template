import axios, { AxiosResponse } from 'axios';

import { getError } from '@/utils';
import { API_ENDPOINTS } from '@/config';

import { User, CreateUserDto } from '../../types';

export interface CreateUserReturn {
  user: User | null;
  error: Error | null;
}

export async function createUser(
  data: CreateUserDto
): Promise<CreateUserReturn> {
  try {
    const response = await axios.post<
      User,
      AxiosResponse<User, CreateUserDto>,
      CreateUserDto
    >(API_ENDPOINTS.USERS, data);

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

export default createUser;
