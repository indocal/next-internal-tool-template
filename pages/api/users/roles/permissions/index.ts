import { NextApiHandler } from 'next';
import { StatusCodes } from 'http-status-codes';

import { prisma } from '@/lib';
import { withCheckPermissions } from '@/auth';
import { withErrorHandler, ApiError } from '@/utils';
import {
  generateCreateUserRolePermissionDtoSchema,
  UserRolePermission,
} from '@/models';

const handler: NextApiHandler<
  UserRolePermission | UserRolePermission[]
> = async ({ method, body }, res) => {
  switch (method) {
    case 'GET': {
      const permissions = await prisma.userRolePermission.findMany({
        orderBy: [
          {
            role: {
              createdAt: 'asc',
            },
          },
          {
            action: 'asc',
          },
        ],
        select: {
          id: true,
          action: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(StatusCodes.OK).json(permissions);
      break;
    }

    case 'POST': {
      const validator =
        generateCreateUserRolePermissionDtoSchema().safeParse(body);

      if (validator.success) {
        const permission = await prisma.userRolePermission.create({
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

    default: {
      throw new ApiError({
        status: StatusCodes.METHOD_NOT_ALLOWED,
        message: `Method ${method} Not Allowed`,
      });
    }
  }
};

export default withErrorHandler(withCheckPermissions(handler));
