import { z as zod } from 'zod';

import { generateUUIDSchema } from '../../common';

import { CreateUserDto } from '../types';

import generateUserStatusSchema from './userStatusSchema';

export function generateCreateUserDtoSchema(): zod.ZodSchema<CreateUserDto> {
  return zod.object(
    {
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

      password: zod.string({
        description: 'Contraseña',
        required_error: 'Contraseña requerida',
        invalid_type_error: 'Formato no válido',
      }),

      status: generateUserStatusSchema(),

      role: generateUUIDSchema({
        description: 'Rol',
        required_error: 'Rol requerido',
        invalid_type_error: 'Formato no válido',
      }),
    },
    {
      description: 'Datos del usuario',
      required_error: 'Datos del usuario requeridos',
      invalid_type_error: 'Formato no válido',
    }
  );
}

export default generateCreateUserDtoSchema();
