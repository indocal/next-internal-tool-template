import { UserRoleOrigin as DBUserRoleOriginEnum } from '@prisma/client';

import { UUID } from '@/models';

export interface UserRole {
  id: UUID;
  type: string;
  name: string;
  description: string;
  origin: DBUserRoleOriginEnum;
  createdAt: Date;
  updatedAt: Date;
}

export default UserRole;
