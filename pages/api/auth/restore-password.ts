import { NextApiHandler } from 'next';
import { StatusCodes } from 'http-status-codes';

import { prisma, transport } from '@/lib';
import {
  withCheckPermissions,
  restorePasswordEmailTemplate,
  generateRestorePasswordDataSchema,
} from '@/auth';
import { withErrorHandler, ApiError } from '@/utils';

const handler: NextApiHandler = async ({ method, body }, res) => {
  switch (method) {
    case 'POST': {
      const validator = generateRestorePasswordDataSchema().safeParse(body);

      if (validator.success) {
        const user = await prisma.user.findUnique({
          where: {
            email: validator.data.email,
          },
        });

        if (user) {
          await transport.sendMail({
            from: process.env.NODEMAILER_FROM,
            to: user.email,
            subject: `Recuperar contraseña: ${user.username}`,
            html: restorePasswordEmailTemplate(user.email, user.password),
            text: `Su contraseña es: ${user.password}`,
          });

          res.status(StatusCodes.OK).end();
          break;
        } else {
          throw new ApiError({
            status: StatusCodes.NOT_FOUND,
            message:
              'No existe usuario registrado con el correo electrónico previsto',
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
        message: `Method ${method} Not Allowed`,
      });
    }
  }
};

export default withErrorHandler(withCheckPermissions(handler));
