import { useCallback } from 'react';
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useSWRConfig } from 'swr';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import { useUsersDialogs } from '@/features';
import { API_ENDPOINTS } from '@/config';
import { createUserRole } from '@/models';

type FormData = zod.infer<typeof schema>;

const schema = zod.object(
  {
    type: zod
      .string({
        description: 'Tipo',
        required_error: 'Debe ingresar el tipo del rol',
        invalid_type_error: 'Formato no válido',
      })
      .min(1, 'Debe ingresar el tipo del rol'),

    name: zod
      .string({
        description: 'Nombre',
        required_error: 'Debe ingresar el nombre del rol',
        invalid_type_error: 'Formato no válido',
      })
      .min(1, 'Debe ingresar el nombre del rol'),

    description: zod
      .string({
        description: 'Descripción',
        required_error: 'Debe ingresar la descripción del rol',
        invalid_type_error: 'Formato no válido',
      })
      .min(1, 'Debe ingresar la descripción del rol'),
  },
  {
    description: 'Datos del rol',
    required_error: 'Debe ingresar los datos del rol',
    invalid_type_error: 'Formato no válido',
  }
);

export const AddUserRoleDialog: React.FC = () => {
  const { mutate } = useSWRConfig();

  const { enqueueSnackbar } = useSnackbar();

  const { addUserRoleDialog } = useUsersDialogs();

  const {
    formState: { isDirty, isSubmitting, errors },
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (formData: FormData) => {
      const { role, error } = await createUserRole({
        type: formData.type,
        name: formData.name,
        description: formData.description,
      });

      if (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }

      if (role) {
        await mutate(API_ENDPOINTS.USERS_ROLES);

        addUserRoleDialog.close(() => {
          enqueueSnackbar('Rol agregado exitosamente', {
            variant: 'success',
          });
        });
      }
    },
    [mutate, addUserRoleDialog, enqueueSnackbar]
  );

  const handleClose = useCallback(() => {
    isDirty
      ? confirm('¿Estás seguro que deseas cancelar esta acción?') &&
        addUserRoleDialog.close()
      : addUserRoleDialog.close();
  }, [addUserRoleDialog, isDirty]);

  return (
    <Dialog open={addUserRoleDialog.isOpen} fullWidth>
      <DialogTitle>Nuevo rol</DialogTitle>

      <DialogContent dividers>
        <Stack component="form" autoComplete="off" spacing={2}>
          <TextField
            required
            autoComplete="off"
            label="Tipo"
            disabled={isSubmitting}
            inputProps={register('type')}
            error={Boolean(errors.type)}
            helperText={errors.type?.message}
          />

          <TextField
            required
            autoComplete="off"
            label="Nombre"
            disabled={isSubmitting}
            inputProps={register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <TextField
            required
            multiline
            autoComplete="off"
            label="Descripción"
            disabled={isSubmitting}
            inputProps={register('description')}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancelar
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Agregar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserRoleDialog;
