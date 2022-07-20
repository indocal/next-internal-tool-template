import axios from 'axios';

import { getError } from '@/utils';
import { API_ENDPOINTS } from '@/config';

export interface ChangePasswordReturn {
  error: Error | null;
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<ChangePasswordReturn> {
  try {
    await axios.put(API_ENDPOINTS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });

    return {
      error: null,
    };
  } catch (error) {
    return {
      error: getError(error),
    };
  }
}

export default changePassword;
