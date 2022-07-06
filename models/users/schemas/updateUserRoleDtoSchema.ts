import { z as zod } from 'zod';

import { UpdateUserRoleDto } from '../types';

export function generateUpdateUserRoleDtoSchema(): zod.ZodSchema<UpdateUserRoleDto> {
  return zod
    .object(
      {
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
      },
      {
        description: 'Datos del rol',
        required_error: 'Datos del rol requeridos',
        invalid_type_error: 'Formato no válido',
      }
    )
    .partial();
}

export default generateUpdateUserRoleDtoSchema;
