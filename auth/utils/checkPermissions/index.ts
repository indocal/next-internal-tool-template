import axios from 'axios';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import qs from 'qs';

import { getError, ApiError } from '@/utils';
import { API_ENDPOINTS } from '@/config';

import {
  MAP_METHOD_TO_PERMISSION,
  MAP_API_ENDPOINT_TO_MODEL,
} from '../../config';
import { PermissionsByRole } from '../../types';

export interface CheckPermissionsReturn {
  hasPermissions: boolean;
  error: Error | null;
}

export async function checkPermissions(
  role: string,
  path: string,
  method: string
): Promise<CheckPermissionsReturn> {
  try {
    const endpoint = Object.keys(MAP_API_ENDPOINT_TO_MODEL).reduce<
      string | null
    >((prev, endpoint) => (path.startsWith(endpoint) ? endpoint : prev), null);

    if (endpoint) {
      const query = qs.stringify({
        role,
      });

      const {
        data: { permissions },
      } = await axios.get<PermissionsByRole>(
        `${API_ENDPOINTS.PERMISSIONS}?${query}`,
        { baseURL: process.env.NEXT_PUBLIC_SITE_URL }
      );

      const model = MAP_API_ENDPOINT_TO_MODEL[endpoint];
      const permission = MAP_METHOD_TO_PERMISSION[method];

      return {
        hasPermissions: !!permissions[model][permission],
        error: null,
      };
    } else {
      throw new ApiError({
        status: StatusCodes.NOT_FOUND,
        message: ReasonPhrases.NOT_FOUND,
      });
    }
  } catch (error) {
    return {
      hasPermissions: false,
      error: getError(error),
    };
  }
}

export default checkPermissions;
