import { z as zod } from 'zod';

import { generateUUIDSchema, generateTrackingDatesSchema } from '../../common';

import { UserRolePermission } from '../types';

import generateUserRoleSchema from './userRoleSchema';

export function generateUserRolePermissionSchema(): zod.ZodSchema<UserRolePermission> {
  return zod.object(
    {
      id: generateUUIDSchema(),

      action: zod.string({
        description: 'Acción',
        required_error: 'Acción a realizar',
        invalid_type_error: 'Formato no válido',
      }),

      role: generateUserRoleSchema(),

      ...generateTrackingDatesSchema(),
    },
    {
      description: 'Datos del permiso',
      required_error: 'Datos del permiso requeridos',
      invalid_type_error: 'Formato no válido',
    }
  );
}

export default generateUserRolePermissionSchema;
