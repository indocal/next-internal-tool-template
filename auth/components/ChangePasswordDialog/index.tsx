import { useCallback } from 'react';
import { signOut } from 'next-auth/react';
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import { PasswordTextField } from '@/components';

import { useAuthDialogs } from '../../context';
import { changePassword } from '../../utils';

type FormData = zod.infer<typeof schema>;

const schema = zod.object(
  {
    currentPassword: zod
      .string({
        description: 'Contraseña actual',
        required_error: 'Debe ingresar su contraseña actual',
        invalid_type_error: 'Formato no válido',
      })
      .min(1, 'Debe ingresar su contraseña actual'),

    newPassword: zod
      .string({
        description: 'Nueva contraseña',
        required_error: 'Debe ingresar su nueva contraseña',
        invalid_type_error: 'Formato no válido',
      })
      .min(1, 'Debe ingresar su nueva contraseña'),
  },
  {
    description: 'Contraseña actual y nueva contraseña',
    required_error: 'Debe ingresar su contraseña actual y su nueva contraseña',
    invalid_type_error: 'Formato no válido',
  }
);

export const ChangePasswordDialog: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { changePasswordDialog } = useAuthDialogs();

  const {
    formState: { isDirty, isSubmitting, errors },
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (formData: FormData) => {
      const response = window.confirm(
        '¿Estás seguro que deseas cambiar su contraseña?; Si hace esto tendrá que volver a iniciar sesión'
      );

      if (response) {
        const { error } = await changePassword(
          formData.currentPassword,
          formData.newPassword
        );

        if (error) {
          enqueueSnackbar(error.message, { variant: 'error' });
        } else {
          await signOut();

          changePasswordDialog.close(() => {
            enqueueSnackbar('Contraseña cambiada exitosamente', {
              variant: 'success',
            });
          });
        }
      }
    },
    [changePasswordDialog, enqueueSnackbar]
  );

  const handleClose = useCallback(() => {
    isDirty
      ? confirm('¿Estás seguro que deseas cancelar esta acción?') &&
        changePasswordDialog.close()
      : changePasswordDialog.close();
  }, [changePasswordDialog, isDirty]);

  return (
    <Dialog open={changePasswordDialog.isOpen} fullWidth>
      <DialogTitle>Cambiar contraseña</DialogTitle>

      <DialogContent dividers>
        <Stack component="form" spacing={2}>
          <PasswordTextField
            required
            autoComplete="current-password"
            label="Contraseña actual"
            disabled={isSubmitting}
            inputProps={register('currentPassword')}
            error={Boolean(errors.currentPassword)}
            helperText={errors.currentPassword?.message}
          />

          <PasswordTextField
            required
            autoComplete="new-password"
            label="Nueva contraseña"
            disabled={isSubmitting}
            inputProps={register('newPassword')}
            error={Boolean(errors.newPassword)}
            helperText={errors.newPassword?.message}
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
          color="error"
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Cambiar contraseña
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
