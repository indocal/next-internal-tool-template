import { useMemo, useCallback } from 'react';
import useSWR from 'swr';
import { AxiosError } from 'axios';

import {
  checkAndReturnApiErrorResponse,
  UnexpectedError,
  ApiError,
} from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { User } from '@/models';

export interface UsersHookReturn {
  loading: boolean;
  validating: boolean;
  users: User[];
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useUsers(): UsersHookReturn {
  const { isValidating, data, error, mutate } = useSWR<User[]>(
    API_ENDPOINTS.USERS
  );

  const parsedError = useMemo<Error | null>(() => {
    if (error) {
      if (error instanceof AxiosError) {
        const response = checkAndReturnApiErrorResponse(error.response?.data);

        return response
          ? new ApiError({
              status: response.error.status,
              message: response.error.message,
              code: response.error.code,
              options: { cause: error },
            })
          : error;
      }

      return error instanceof Error ? error : new UnexpectedError();
    }

    return null;
  }, [error]);

  const handleRefetch = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return {
    loading: typeof data === 'undefined' && !error,
    validating: isValidating,
    users: data ?? [],
    error: parsedError,
    refetch: handleRefetch,
  };
}

export default useUsers;
