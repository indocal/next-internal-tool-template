import { z as zod } from 'zod';

import { UserRoleOrigin } from '../types';

export function generateUserRoleOriginSchema(): zod.ZodSchema<UserRoleOrigin> {
  return zod.enum(['SYSTEM', 'USER']).describe('Origin del rol');
}

export default generateUserRoleOriginSchema;
