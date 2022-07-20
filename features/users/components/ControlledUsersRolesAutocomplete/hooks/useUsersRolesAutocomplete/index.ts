import { useCallback } from 'react';
import useSWR from 'swr';

import { getError } from '@/utils';
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

  const handleRefetch = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return {
    loading: typeof data === 'undefined' && !error,
    validating: isValidating,
    roles: data || [],
    error: error ? getError(error) : null,
    refetch: handleRefetch,
  };
}

export default useUsersRolesAutocomplete;
