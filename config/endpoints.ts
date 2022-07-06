export enum API_ENDPOINTS {
  // Auth
  RESTORE_PASSWORD = '/api/auth/restore-password',
  CHANGE_PASSWORD = '/api/auth/change-password',
  PERMISSIONS = '/api/auth/permissions',

  // Users
  USERS = '/api/users',
  USERS_ROLES = '/api/users/roles',
  USERS_ROLES_PERMISSIONS = '/api/users/roles/permissions',
}

export default API_ENDPOINTS;
