import { UserStatus as DBUserStatusEnum } from '@prisma/client';

import { UUID } from '@/models';

export type UpdateUserDto = Partial<{
  username: string;
  email: string;
  fullName: string;

  status: DBUserStatusEnum;
  role: UUID;
}>;

export default UpdateUserDto;
