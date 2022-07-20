import { useCallback } from 'react';
import useSWR from 'swr';

import { getError } from '@/utils';
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

  const handleRefetch = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return {
    loading: typeof data === 'undefined' && !error,
    validating: isValidating,
    users: data ?? [],
    error: error ? getError(error) : null,
    refetch: handleRefetch,
  };
}

export default useUsers;
