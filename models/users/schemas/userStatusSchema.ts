import { z as zod } from 'zod';

import { UserStatus } from '../types';

export function generateUserStatusSchema(): zod.ZodSchema<UserStatus> {
  return zod.enum(['ENABLED', 'DISABLED']).describe('Estado del usuario');
}

export default generateUserStatusSchema;
