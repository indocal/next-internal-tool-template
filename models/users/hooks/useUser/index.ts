import { useCallback } from 'react';
import useSWR from 'swr';

import { getError } from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { UUID, User } from '@/models';

export interface UserHookReturn {
  loading: boolean;
  validating: boolean;
  user: User | null;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useUser(id: UUID): UserHookReturn {
  const { isValidating, data, error, mutate } = useSWR<User>(
    `${API_ENDPOINTS.USERS}/${id}`
  );

  const handleRefetch = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return {
    loading: typeof data === 'undefined' && !error,
    validating: isValidating,
    user: data ?? null,
    error: error ? getError(error) : null,
    refetch: handleRefetch,
  };
}

export default useUser;
