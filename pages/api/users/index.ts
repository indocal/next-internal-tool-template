import { NextApiHandler } from 'next';
import { StatusCodes } from 'http-status-codes';

import { prisma } from '@/lib';
import { withCheckPermissions } from '@/auth';
import { withErrorHandler, ApiError } from '@/utils';
import { generateCreateUserDtoSchema, User } from '@/models';

const handler: NextApiHandler<User | User[]> = async (
  { method, body },
  res
) => {
  switch (method) {
    case 'GET': {
      const users = await prisma.user.findMany({
        orderBy: {
          fullName: 'asc',
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

      res.status(StatusCodes.OK).json(users);
      break;
    }

    case 'POST': {
      const validator = generateCreateUserDtoSchema().safeParse(body);

      if (validator.success) {
        const user = await prisma.user.create({
          data: {
            username: validator.data.username,
            email: validator.data.email,
            fullName: validator.data.fullName,
            password: validator.data.password,
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

    default: {
      throw new ApiError({
        status: StatusCodes.METHOD_NOT_ALLOWED,
        message: `Method ${method} Not Allowed`,
      });
    }
  }
};

export default withErrorHandler(withCheckPermissions(handler));
