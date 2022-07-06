import { NextApiHandler } from 'next';
import { StatusCodes } from 'http-status-codes';

import { prisma } from '@/lib';
import { withCheckPermissions } from '@/auth';
import { withErrorHandler, ApiError } from '@/utils';
import {
  generateUpdateUserRolePermissionDtoSchema,
  UUID,
  UserRolePermission,
} from '@/models';

const handler: NextApiHandler<UserRolePermission | null> = async (
  { method, query, body },
  res
) => {
  switch (method) {
    case 'GET': {
      const permission = await prisma.userRolePermission.findUnique({
        where: {
          id: query.id as UUID,
        },
        select: {
          id: true,
          action: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(StatusCodes.OK).json(permission);
      break;
    }

    case 'PUT': {
      const validator =
        generateUpdateUserRolePermissionDtoSchema().safeParse(body);

      if (validator.success) {
        const permission = await prisma.userRolePermission.update({
          where: {
            id: query.id as UUID,
          },
          data: {
            action: validator.data.action,
            role: {
              connect: {
                id: validator.data.role,
              },
            },
          },
          select: {
            id: true,
            action: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        res.status(StatusCodes.OK).json(permission);
        break;
      } else {
        throw new ApiError({
          status: StatusCodes.BAD_REQUEST,
          message: 'Los datos proporcionados no son válidos',
        });
      }
    }

    case 'DELETE': {
      const permission = await prisma.userRolePermission.delete({
        where: {
          id: query.id as UUID,
        },
        select: {
          id: true,
          action: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(StatusCodes.OK).json(permission);
      break;
    }

    default: {
      throw new ApiError({
        status: StatusCodes.METHOD_NOT_ALLOWED,
        message: `Method ${method} Not Allowed`,
      });
    }
  }
};

export default withErrorHandler(withCheckPermissions(handler));
