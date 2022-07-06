import { z as zod } from 'zod';

export function generateChangePasswordDataSchema(): zod.ZodSchema<{
  currentPassword: string;
  newPassword: string;
}> {
  return zod.object(
    {
      currentPassword: zod.string({
        description: 'Contraseña actual',
        required_error: 'Contraseña actual requerida',
        invalid_type_error: 'Formato no válido',
      }),

      newPassword: zod.string({
        description: 'Nueva contraseña',
        required_error: 'Nueva contraseña requerida',
        invalid_type_error: 'Formato no válido',
      }),
    },
    {
      description: 'Contraseña actual y nueva contraseña',
      required_error: 'Contraseña actual y nueva contraseña requeridas',
      invalid_type_error: 'Formato no válido',
    }
  );
}

export default generateChangePasswordDataSchema;
