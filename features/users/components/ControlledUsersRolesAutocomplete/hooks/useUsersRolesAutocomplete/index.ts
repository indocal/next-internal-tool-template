import { useMemo, useCallback } from 'react';
import useSWR from 'swr';
import { AxiosError } from 'axios';

import {
  checkAndReturnApiErrorResponse,
  UnexpectedError,
  ApiError,
} from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { UserRole } from '@/models';

export interface UsersRolesAutocompleteHookReturn {
  loading: boolean;
  validating: boolean;
  roles: UserRole[];
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useUsersRolesAutocomplete(): UsersRolesAutocompleteHookReturn {
  const { isValidating, data, error, mutate } = useSWR<UserRole[]>(
    API_ENDPOINTS.USERS_ROLES
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
    roles: data || [],
    error: parsedError,
    refetch: handleRefetch,
  };
}

export default useUsersRolesAutocomplete;
