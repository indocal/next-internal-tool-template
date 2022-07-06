import { z as zod } from 'zod';

import { UUID } from '../types';

type Messages = Partial<{
  description: string;
  required_error: string;
  invalid_type_error: string;
  uuid_error: string;
}>;

export function generateUUIDSchema(messages?: Messages): zod.ZodSchema<UUID> {
  return zod
    .string({
      description: messages?.description || 'Identificador único universal',
      required_error: messages?.required_error || 'Debe ingresar el UUID',
      invalid_type_error: messages?.invalid_type_error || 'Formato no válido',
    })
    .uuid(messages?.uuid_error || 'Debe ingresar un UUID válido');
}

export default generateUUIDSchema;
