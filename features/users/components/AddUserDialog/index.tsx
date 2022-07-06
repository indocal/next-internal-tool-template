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
import { useForm, Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import {
  ControlledUserStatusSelect,
  ControlledUsersRolesAutocomplete,
  useUsersDialogs,
} from '@/features';
import { PasswordTextField } from '@/components';
import { API_ENDPOINTS } from '@/config';
import {
  createUser,
  generateUserStatusSchema,
  generateUserRoleSchema,
} from '@/models';

type FormData = zod.infer<typeof schema>;

const schema = zod.object(
  {
    username: zod
      .string({
        description: 'Usuario',
        required_error: 'Debe ingresar el usuario',
        invalid_type_error: 'Formato no válido',
      })
      .min(1, 'Debe ingresar el usuario'),

    email: zod
      .string({
        description: 'Correo electrónico del usuario',
        required_error: 'Debe ingresar el correo electrónico del usuario',
        invalid_type_error: 'Formato no válido',
      })
      .email('Debe ingresar un correo electrónico válido'),

    fullName: zod
      .string({
        description: 'Nombre completo del usuario',
        required_error: 'Debe ingresar el nombre completo del usuario',
        invalid_type_error: 'Formato no válido',
      })
      .min(1, 'Debe ingresar el nombre completo del usuario'),

    password: zod
      .string({
        description: 'Contraseña del usuario',
        required_error: 'Debe ingresar la contraseña del usuario',
        invalid_type_error: 'Formato no válido',
      })
      .min(1, 'Debe ingresar la contraseña del usuario'),

    status: generateUserStatusSchema(),
    role: generateUserRoleSchema(),
  },
  {
    description: 'Datos del usuario',
    required_error: 'Debe ingresar los datos del usuario',
    invalid_type_error: 'Formato no válido',
  }
);

export const AddUserDialog: React.FC = () => {
  const { mutate } = useSWRConfig();

  const { enqueueSnackbar } = useSnackbar();

  const { addUserDialog } = useUsersDialogs();

  const {
    formState: { isDirty, isSubmitting, errors },
    register,
    control,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: 'ENABLED',
    },
  });

  const onSubmit = useCallback(
    async (formData: FormData) => {
      const { user, error } = await createUser({
        username: formData.username,
        email: formData.email,
        fullName: formData.fullName,
        password: formData.password,
        status: formData.status,
        role: formData.role.id,
      });

      if (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }

      if (user) {
        await mutate(API_ENDPOINTS.USERS);

        addUserDialog.close(() => {
          enqueueSnackbar('Usuario agregado exitosamente', {
            variant: 'success',
          });
        });
      }
    },
    [mutate, addUserDialog, enqueueSnackbar]
  );

  const handleClose = useCallback(() => {
    isDirty
      ? confirm('¿Estás seguro que deseas cancelar esta acción?') &&
        addUserDialog.close()
      : addUserDialog.close();
  }, [addUserDialog, isDirty]);

  return (
    <Dialog open={addUserDialog.isOpen} fullWidth>
      <DialogTitle>Nuevo usuario</DialogTitle>

      <DialogContent dividers>
        <Stack component="form" autoComplete="off" spacing={2}>
          <TextField
            required
            autoComplete="off"
            label="Nombre completo"
            disabled={isSubmitting}
            inputProps={register('fullName')}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName?.message}
          />

          <TextField
            required
            autoComplete="off"
            label="Usuario"
            disabled={isSubmitting}
            inputProps={register('username')}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
          />

          <TextField
            required
            type="email"
            autoComplete="off"
            label="Correo electrónico"
            disabled={isSubmitting}
            inputProps={register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <PasswordTextField
            required
            autoComplete="off"
            label="Contraseña"
            disabled={isSubmitting}
            inputProps={register('password')}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />

          <ControlledUserStatusSelect
            name="status"
            label="Estado"
            control={control as unknown as Control}
            formControlProps={{ required: true, disabled: isSubmitting }}
          />

          <ControlledUsersRolesAutocomplete
            name="role"
            label="Rol"
            control={control as unknown as Control}
            autocompleteProps={{ disabled: isSubmitting }}
            textFieldProps={{ required: true }}
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

export default AddUserDialog;
