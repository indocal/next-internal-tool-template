import { UserRole as DBUserRoleModel } from '@prisma/client';

import { UUID } from '@/models';

export interface UserRolePermission {
  id: UUID;
  action: string;
  role: DBUserRoleModel;
  createdAt: Date;
  updatedAt: Date;
}

export default UserRolePermission;
