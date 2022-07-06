import {
  UserStatus as DBUserStatusEnum,
  UserRole as DBUserRoleModel,
} from '@prisma/client';

import { UUID } from '@/models';

export interface User {
  id: UUID;
  username: string;
  email: string;
  fullName: string;
  status: DBUserStatusEnum;
  role: DBUserRoleModel | null;
  createdAt: Date;
  updatedAt: Date;
}

export default User;
