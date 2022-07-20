import { useMemo, useCallback } from 'react';
import useSWR from 'swr';
import qs from 'qs';

import { PermissionsByRole } from '@/auth';
import { getError } from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { UserRole } from '@/models';

export interface UserRolePermissionsByRoleHookReturn {
  loading: boolean;
  validating: boolean;
  role: PermissionsByRole['role'] | null;
  permissions: PermissionsByRole['permissions'] | null;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useUserRolePermissionsByRole(
  role: UserRole
): UserRolePermissionsByRoleHookReturn {
  const query = useMemo(
    () =>
      qs.stringify({
        role: role.type,
      }),
    [role.type]
  );

  const { isValidating, data, error, mutate } = useSWR<PermissionsByRole>(
    `${API_ENDPOINTS.PERMISSIONS}?${query}`
  );

  const handleRefetch = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return {
    loading: typeof data === 'undefined' && !error,
    validating: isValidating,
    role: data?.role ?? null,
    permissions: data?.permissions ?? null,
    error: error ? getError(error) : null,
    refetch: handleRefetch,
  };
}

export default useUserRolePermissionsByRole;
