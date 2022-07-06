import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { createApiErrorResponse, ApiError } from '@/utils';

export const withErrorHandler =
  (target: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await target(req, res);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).send(createApiErrorResponse(error));
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(createApiErrorResponse(error));
      }
    }
  };

export default withErrorHandler;
