import { useCallback } from 'react';
import useSWR from 'swr';

import { getError } from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { UUID, UserRolePermission } from '@/models';

export interface UserRolePermissionHookReturn {
  loading: boolean;
  validating: boolean;
  permission: UserRolePermission | null;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useUserRolePermission(id: UUID): UserRolePermissionHookReturn {
  const { isValidating, data, error, mutate } = useSWR<UserRolePermission>(
    `${API_ENDPOINTS.USERS_ROLES_PERMISSIONS}/${id}`
  );

  const handleRefetch = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return {
    loading: typeof data === 'undefined' && !error,
    validating: isValidating,
    permission: data ?? null,
    error: error ? getError(error) : null,
    refetch: handleRefetch,
  };
}

export default useUserRolePermission;
