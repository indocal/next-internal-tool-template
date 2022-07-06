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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import { useAuthDialogs } from '../../context';
import { sendRestorePasswordEmail } from '../../utils';

type FormData = zod.infer<typeof schema>;

const schema = zod.object(
  {
    email: zod
      .string({
        description: 'Correo electrónico',
        required_error: 'Debe ingresar su correo electrónico',
        invalid_type_error: 'Formato no válido',
      })
      .email('Debe ingresar un correo electrónico válido'),
  },
  {
    description: 'Correo electrónico de recuperación',
    required_error: 'Debe ingresar su correo electrónico',
    invalid_type_error: 'Formato no válido',
  }
);

export const RestorePasswordDialog: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { restorePasswordDialog } = useAuthDialogs();

  const {
    formState: { isDirty, isSubmitting, errors },
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (formData: FormData) => {
      const { error } = await sendRestorePasswordEmail(formData.email);

      if (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      } else {
        restorePasswordDialog.close(() => {
          enqueueSnackbar('Correo de recuperación enviado exitosamente', {
            variant: 'success',
          });
        });
      }
    },
    [restorePasswordDialog, enqueueSnackbar]
  );

  const handleClose = useCallback(() => {
    isDirty
      ? confirm('¿Estás seguro que deseas cancelar esta acción?') &&
        restorePasswordDialog.close()
      : restorePasswordDialog.close();
  }, [restorePasswordDialog, isDirty]);

  return (
    <Dialog open={restorePasswordDialog.isOpen} fullWidth>
      <DialogTitle>Recuperar contraseña</DialogTitle>

      <DialogContent dividers>
        <Stack component="form" autoComplete="off" spacing={2}>
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
          Enviar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default RestorePasswordDialog;
