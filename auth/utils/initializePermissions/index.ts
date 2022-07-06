import { PermissionsByModel } from '../../types';

export function initializePermissions(
  models: string[],
  access: 'full' | 'read' | 'write' | 'none' = 'none'
): PermissionsByModel {
  return models.reduce<PermissionsByModel>(
    (prev, model) =>
      Object.assign(prev, {
        [model]: {
          read: ['full', 'read'].includes(access),
          create: ['full', 'write'].includes(access),
          update: ['full', 'write'].includes(access),
          delete: ['full', 'write'].includes(access),
        },
      }),
    {}
  );
}

export default initializePermissions;
