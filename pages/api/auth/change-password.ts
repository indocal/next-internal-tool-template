import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';
import { StatusCodes } from 'http-status-codes';

import { prisma } from '@/lib';
import { withCheckPermissions, generateChangePasswordDataSchema } from '@/auth';
import { withErrorHandler, ApiError } from '@/utils';

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'PUT': {
      const schema = generateChangePasswordDataSchema();

      const result = schema.safeParse(req.body);

      if (result.success) {
        const session = await getSession({ req });

        const user = await prisma.user.findUnique({
          where: {
            id: session?.user.id,
          },
        });

        if (user) {
          if (user.password === result.data.currentPassword) {
            await prisma.user.update({
              where: {
                id: user.id,
              },
              data: {
                password: result.data.newPassword,
              },
            });

            res.status(StatusCodes.OK).end();
            break;
          } else {
            throw new ApiError({
              status: StatusCodes.FORBIDDEN,
              message: 'La contraseña actual provista no es la correcta',
            });
          }
        } else {
          throw new ApiError({
            status: StatusCodes.UNAUTHORIZED,
            message: 'Sesión no válida, por favor vuelva a iniciar sesión',
          });
        }
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
        message: `Method ${req.method} Not Allowed`,
      });
    }
  }
};

export default withErrorHandler(withCheckPermissions(handler));
