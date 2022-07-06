import { NextApiHandler } from 'next';
import { StatusCodes } from 'http-status-codes';

import { prisma } from '@/lib';
import { withCheckPermissions } from '@/auth';
import { withErrorHandler, ApiError } from '@/utils';
import { generateUpdateUserDtoSchema, UUID, User } from '@/models';

const handler: NextApiHandler<User | null> = async (
  { method, query, body },
  res
) => {
  switch (method) {
    case 'GET': {
      const user = await prisma.user.findUnique({
        where: {
          id: query.id as UUID,
        },
        select: {
          id: true,
          username: true,
          email: true,
          fullName: true,
          status: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(StatusCodes.OK).json(user);
      break;
    }

    case 'PUT': {
      const validator = generateUpdateUserDtoSchema().safeParse(body);

      if (validator.success) {
        const user = await prisma.user.update({
          where: {
            id: query.id as UUID,
          },
          data: {
            username: validator.data.username,
            email: validator.data.email,
            fullName: validator.data.fullName,
            status: validator.data.status,
            role: {
              connect: {
                id: validator.data.role,
              },
            },
          },
          select: {
            id: true,
            username: true,
            email: true,
            fullName: true,
            status: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        res.status(StatusCodes.OK).json(user);
        break;
      } else {
        throw new ApiError({
          status: StatusCodes.BAD_REQUEST,
          message: 'Los datos proporcionados no son válidos',
        });
      }
    }

    case 'DELETE': {
      const user = await prisma.user.delete({
        where: {
          id: query.id as UUID,
        },
        select: {
          id: true,
          username: true,
          email: true,
          fullName: true,
          status: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(StatusCodes.OK).json(user);
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
