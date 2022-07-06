import { UserStatus as DBUserStatusEnum } from '@prisma/client';

import { UUID } from '@/models';

export type CreateUserDto = {
  username: string;
  email: string;
  fullName: string;
  password: string;

  status: DBUserStatusEnum;
  role: UUID;
};

export default CreateUserDto;
