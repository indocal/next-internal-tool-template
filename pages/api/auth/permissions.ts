import { NextApiHandler } from 'next';
import { StatusCodes } from 'http-status-codes';

import { prisma } from '@/lib';
import {
  initializePermissions,
  PermissionsByRole,
  PermissionsByModel,
} from '@/auth';
import { withErrorHandler, ApiError } from '@/utils';
import { UUID } from '@/models';

const handler: NextApiHandler<PermissionsByRole | PermissionsByRole[]> = async (
  { method, query },
  res
) => {
  switch (method) {
    case 'GET': {
      const models = Object.keys(prisma).filter((key) => !key.startsWith('_'));

      if (query.role) {
        const [role, permissions] = await prisma.$transaction([
          prisma.userRole.findUnique({
            where: {
              type: query.role as string,
            },
          }),
          prisma.userRolePermission.findMany({
            where: {
              role: {
                type: query.role as string,
              },
            },
            include: {
              role: true,
            },
          }),
        ]);

        if (role) {
          const permissionsByRole: PermissionsByRole = permissions.reduce(
            (prev, permission) => {
              const [model, action] = permission.action.split('::');

              prev.permissions[model][action] = true;

              return {
                role: prev.role,
                permissions: prev.permissions,
              };
            },
            {
              role,
              permissions: initializePermissions(models),
            }
          );

          res.status(StatusCodes.OK).json(permissionsByRole);
          break;
        } else {
          throw new ApiError({
            status: StatusCodes.NOT_FOUND,
            message: 'Rol inválido',
          });
        }
      } else {
        const [roles, permissions] = await prisma.$transaction([
          prisma.userRole.findMany(),
          prisma.userRolePermission.findMany({
            include: {
              role: true,
            },
          }),
        ]);

        let permissionsByRole: Record<UUID, PermissionsByModel> = roles.reduce(
          (prev, role) =>
            Object.assign(prev, {
              [role.id]: initializePermissions(models),
            }),
          {} as Record<UUID, PermissionsByModel>
        );

        permissionsByRole = permissions.reduce((prev, permission) => {
          const [model, action] = permission.action.split('::');

          permissionsByRole[permission.role.id][model][action] = true;

          return Object.assign(prev, {
            [permission.role.id]: permissionsByRole[permission.role.id],
          });
        }, permissionsByRole);

        const permissionsByRoleArray = roles.map((role) => ({
          role,
          permissions: permissionsByRole[role.id],
        }));

        res.status(StatusCodes.OK).json(permissionsByRoleArray);
        break;
      }
    }

    default: {
      throw new ApiError({
        status: StatusCodes.METHOD_NOT_ALLOWED,
        message: `Method ${method} Not Allowed`,
      });
    }
  }
};

export default withErrorHandler(handler);
