import { NextApiHandler } from 'next';
import { StatusCodes } from 'http-status-codes';

import { prisma } from '@/lib';
import { withCheckPermissions } from '@/auth';
import { withErrorHandler, ApiError } from '@/utils';
import { generateUpdateUserRoleDtoSchema, UUID, UserRole } from '@/models';

const handler: NextApiHandler<UserRole | null> = async (
  { method, query, body },
  res
) => {
  switch (method) {
    case 'GET': {
      const role = await prisma.userRole.findUnique({
        where: {
          id: query.id as UUID,
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
    }

    case 'PUT': {
      const schema = generateUpdateUserRoleDtoSchema();

      const result = schema.safeParse(body);

      if (result.success) {
        const role = await prisma.userRole.update({
          where: {
            id: query.id as UUID,
          },
          data: {
            type: result.data.type,
            name: result.data.name,
            description: result.data.description,
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

    case 'DELETE': {
      const role = await prisma.userRole.delete({
        where: {
          id: query.id as UUID,
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
