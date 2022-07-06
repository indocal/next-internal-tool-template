import { UUID } from '@/models';

export type CreateUserRolePermissionDto = {
  action: string;
  role: UUID;
};

export default CreateUserRolePermissionDto;
