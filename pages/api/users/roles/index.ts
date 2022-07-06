import { NextApiHandler } from 'next';
import { StatusCodes } from 'http-status-codes';

import { prisma } from '@/lib';
import { withCheckPermissions } from '@/auth';
import { withErrorHandler, ApiError } from '@/utils';
import { generateCreateUserRoleDtoSchema, UserRole } from '@/models';

const handler: NextApiHandler<UserRole | UserRole[]> = async (
  { method, body },
  res
) => {
  switch (method) {
    case 'GET': {
      const roles = await prisma.userRole.findMany({
        orderBy: [
          {
            origin: 'asc',
          },
          {
            createdAt: 'asc',
          },
        ],
        select: {
          id: true,
          type: true,
          name: true,
          description: true,
          origin: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(StatusCodes.OK).json(roles);
      break;
    }

    case 'POST': {
      const validator = generateCreateUserRoleDtoSchema().safeParse(body);

      if (validator.success) {
        const role = await prisma.userRole.create({
          data: {
            type: validator.data.type,
            name: validator.data.name,
            description: validator.data.description,
          },
          select: {
            id: true,
            type: true,
            name: true,
            description: true,
            origin: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        res.status(StatusCodes.OK).json(role);
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
