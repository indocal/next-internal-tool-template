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
      const schema = generateUpdateUserDtoSchema();

      const result = schema.safeParse(body);

      if (result.success) {
        const user = await prisma.user.update({
          where: {
            id: query.id as UUID,
          },
          data: {
            username: result.data.username,
            email: result.data.email,
            fullName: result.data.fullName,
            status: result.data.status,
            role: {
              connect: {
                id: result.data.role,
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
