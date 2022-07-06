import { z as zod } from 'zod';

import { generateUUIDSchema, generateTrackingDatesSchema } from '../../common';

import generateUserRoleOriginSchema from './userRoleOriginSchema';

import { UserRole } from '../types';

export function generateUserRoleSchema(): zod.ZodSchema<UserRole> {
  return zod.object(
    {
      id: generateUUIDSchema(),

      type: zod.string({
        description: 'Tipo',
        required_error: 'Tipo requerido',
        invalid_type_error: 'Formato no válido',
      }),

      name: zod.string({
        description: 'Nombre',
        required_error: 'Nombre requerido',
        invalid_type_error: 'Formato no válido',
      }),

      description: zod.string({
        description: 'Descripción',
        required_error: 'Descripción requerida',
        invalid_type_error: 'Formato no válido',
      }),

      origin: generateUserRoleOriginSchema(),

      ...generateTrackingDatesSchema(),
    },
    {
      description: 'Datos del rol',
      required_error: 'Datos del rol requeridos',
      invalid_type_error: 'Formato no válido',
    }
  );
}

export default generateUserRoleSchema;
