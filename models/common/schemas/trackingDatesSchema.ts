import { z as zod } from 'zod';

type TrackingDates = {
  createdAt: zod.ZodDate;
  updatedAt: zod.ZodDate;
};

export function generateTrackingDatesSchema(): TrackingDates {
  return {
    createdAt: zod
      .date({
        description: 'Fecha de creación',
        required_error: 'Debe ingresar la fecha de creación',
        invalid_type_error: 'Formato no válido',
      })
      .or(
        zod.string({
          description: 'Fecha de creación',
          required_error: 'Debe ingresar la fecha de creación',
          invalid_type_error: 'Formato no válido',
        })
      )
      .or(
        zod.number({
          description: 'Fecha de creación',
          required_error: 'Debe ingresar la fecha de creación',
          invalid_type_error: 'Formato no válido',
        })
      ) as unknown as zod.ZodDate,

    updatedAt: zod
      .date({
        description: 'Última fecha de actualización',
        required_error: 'Debe ingresar la última fecha de actualización',
        invalid_type_error: 'Formato no válido',
      })
      .or(
        zod.string({
          description: 'Última fecha de actualización',
          required_error: 'Debe ingresar la última fecha de actualización',
          invalid_type_error: 'Formato no válido',
        })
      )
      .or(
        zod.number({
          description: 'Última fecha de actualización',
          required_error: 'Debe ingresar la última fecha de actualización',
          invalid_type_error: 'Formato no válido',
        })
      ) as unknown as zod.ZodDate,
  };
}

export default generateTrackingDatesSchema;
