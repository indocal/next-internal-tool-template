import { useCallback } from 'react';
import useSWR from 'swr';

import { getError } from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { UUID, UserRole } from '@/models';

export interface UserRoleHookReturn {
  loading: boolean;
  validating: boolean;
  role: UserRole | null;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useUserRole(id: UUID): UserRoleHookReturn {
  const { isValidating, data, error, mutate } = useSWR<UserRole>(
    `${API_ENDPOINTS.USERS_ROLES}/${id}`
  );

  const handleRefetch = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return {
    loading: typeof data === 'undefined' && !error,
    validating: isValidating,
    role: data ?? null,
    error: error ? getError(error) : null,
    refetch: handleRefetch,
  };
}

export default useUserRole;
