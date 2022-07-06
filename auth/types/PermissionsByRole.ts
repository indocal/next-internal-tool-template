import { UserRole } from '@/models';

import PermissionsByModel from './PermissionsByModel';

export type PermissionsByRole = {
  role: UserRole;
  permissions: PermissionsByModel;
};

export default PermissionsByRole;
