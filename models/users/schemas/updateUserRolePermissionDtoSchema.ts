import { z as zod } from 'zod';

import { generateUUIDSchema } from '../../common';

import { UpdateUserRolePermissionDto } from '../types';

export function generateUpdateUserRolePermissionDtoSchema(): zod.ZodSchema<UpdateUserRolePermissionDto> {
  return zod
    .object(
      {
        action: zod.string({
          description: 'Acción',
          required_error: 'Acción a realizar',
          invalid_type_error: 'Formato no válido',
        }),

        role: generateUUIDSchema({
          description: 'Rol',
          required_error: 'Rol requerido',
          invalid_type_error: 'Formato no válido',
        }),
      },
      {
        description: 'Datos del permiso',
        required_error: 'Datos del permiso requeridos',
        invalid_type_error: 'Formato no válido',
      }
    )
    .partial();
}

export default generateUpdateUserRolePermissionDtoSchema;
