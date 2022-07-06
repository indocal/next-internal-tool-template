import { z as zod } from 'zod';

import { generateUUIDSchema, generateTrackingDatesSchema } from '../../common';

import { User } from '../types';

import generateUserRoleSchema from './userRoleSchema';
import generateUserStatusSchema from './userStatusSchema';

export function generateUserSchema(): zod.ZodSchema<User> {
  return zod.object(
    {
      id: generateUUIDSchema(),

      username: zod.string({
        description: 'Usuario',
        required_error: 'Usuario requerido',
        invalid_type_error: 'Formato no válido',
      }),

      email: zod
        .string({
          description: 'Correo electrónico',
          required_error: 'Correo electrónico requerido',
          invalid_type_error: 'Formato no válido',
        })
        .email('Correo electrónico no válido'),

      fullName: zod.string({
        description: 'Nombre completo',
        required_error: 'Nombre completo requerido',
        invalid_type_error: 'Formato no válido',
      }),

      status: generateUserStatusSchema(),
      role: generateUserRoleSchema().nullable(),

      ...generateTrackingDatesSchema(),
    },
    {
      description: 'Datos del usuario',
      required_error: 'Datos del usuario requeridos',
      invalid_type_error: 'Formato no válido',
    }
  );
}

export default generateUserSchema;
