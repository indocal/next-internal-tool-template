import useSWR from 'swr/immutable';

import { PermissionsByRole } from '@/auth';
import { UnexpectedError } from '@/utils';
import { API_ENDPOINTS } from '@/config';
import { UserRole } from '@/models';

type Options = Partial<{
  strategy: 'every' | 'some';
}>;

type HasPermissionsFunction = (
  role: UserRole | string,
  target: string | string[],
  options?: Options
) => boolean;

export interface CheckPermissionsHookReturn {
  hasPermissions: HasPermissionsFunction;
  error: Error | null;
}

export function useCheckPermissions(): CheckPermissionsHookReturn {
  const { data: permissionsByRole, error } = useSWR<PermissionsByRole[]>(
    API_ENDPOINTS.PERMISSIONS
  );

  if (!permissionsByRole) return { hasPermissions: () => false, error: null };

  return {
    hasPermissions: (role, target, options) => {
      if (typeof target === 'string') {
        const rolePermissions = permissionsByRole.find((rolePermissions) => {
          if (typeof role === 'string') {
            return rolePermissions.role.type === 'public';
          } else {
            return rolePermissions.role.type === role.type;
          }
        });

        const [model, action] = target.split('::');

        return !!rolePermissions?.permissions[model][action];
      } else {
        const rolePermissions = permissionsByRole.find((rolePermissions) => {
          if (typeof role === 'string') {
            return rolePermissions.role.type === 'public';
          } else {
            return rolePermissions.role.type === role.type;
          }
        });

        return target[options?.strategy || 'every']((target) => {
          const [model, action] = target.split('::');

          return !!rolePermissions?.permissions[model][action];
        });
      }
    },
    error: error instanceof Error ? error : new UnexpectedError(),
  };
}

export default useCheckPermissions;
