import axios from 'axios';

import { getError } from '@/utils';
import { API_ENDPOINTS } from '@/config';

export interface SendRestorePasswordEmailReturn {
  error: Error | null;
}

export async function sendRestorePasswordEmail(
  email: string
): Promise<SendRestorePasswordEmailReturn> {
  try {
    await axios.post(API_ENDPOINTS.RESTORE_PASSWORD, {
      email,
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

export default sendRestorePasswordEmail;
