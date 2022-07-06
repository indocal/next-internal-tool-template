import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { checkPermissions } from '@/auth';
import { ApiError } from '@/utils';

export const withCheckPermissions =
  (target: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.url) {
      const session = await getSession({ req });

      const { hasPermissions } = await checkPermissions(
        session?.user?.role ? session.user.role.type : 'public',
        req.url,
        req.method || 'GET'
      );

      if (hasPermissions) {
        return await target(req, res);
      } else {
        throw new ApiError({
          status: StatusCodes.UNAUTHORIZED,
          message: ReasonPhrases.UNAUTHORIZED,
        });
      }
    } else {
      throw new ApiError({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      });
    }
  };

export default withCheckPermissions;
