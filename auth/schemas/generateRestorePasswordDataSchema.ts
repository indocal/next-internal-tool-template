import { z as zod } from 'zod';

export function generateRestorePasswordDataSchema(): zod.ZodSchema<{
  email: string;
}> {
  return zod.object(
    {
      email: zod
        .string({
          description: 'Correo electrónico',
          required_error: 'Correo electrónico requerido',
          invalid_type_error: 'Formato no válido',
        })
        .email('Correo electrónico no válido'),
    },
    {
      description: 'Correo electrónico de recuperación',
      required_error: 'Correo electrónico requerido',
      invalid_type_error: 'Formato no válido',
    }
  );
}

export default generateRestorePasswordDataSchema;
