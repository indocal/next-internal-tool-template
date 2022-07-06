import { API_ENDPOINTS } from '@/config';

export const MAP_API_ENDPOINT_TO_MODEL: Record<string, string> = {
  [API_ENDPOINTS.USERS]: 'user',
  [API_ENDPOINTS.USERS_ROLES]: 'userRole',
  [API_ENDPOINTS.USERS_ROLES_PERMISSIONS]: 'userRolePermission',
};

export default MAP_API_ENDPOINT_TO_MODEL;
