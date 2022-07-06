import { UUID } from '@/models';

export type UpdateUserRolePermissionDto = Partial<{
  action: string;
  role: UUID;
}>;

export default UpdateUserRolePermissionDto;
