import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
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

import { useCheckPermissions } from '@/auth';
import {
  ControlledUserStatusSelect,
  ControlledUsersRolesAutocomplete,
  useUsersDialogs,
} from '@/features';
import { Loader, NoData, ErrorInfo } from '@/components';
import { API_ENDPOINTS } from '@/config';
import {
  useUser,
  updateUser,
  generateUserStatusSchema,
  generateUserRoleSchema,
  UUID,
} from '@/models';

type FormData = zod.infer<typeof schema>;

const schema = zod
  .object(
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

      status: generateUserStatusSchema(),
      role: generateUserRoleSchema(),
    },
    {
      description: 'Datos del usuario',
      required_error: 'Debe ingresar los datos del usuario',
      invalid_type_error: 'Formato no válido',
    }
  )
  .partial();

export const EditUserDialog: React.FC = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const { mutate } = useSWRConfig();

  const { enqueueSnackbar } = useSnackbar();

  const { hasPermissions } = useCheckPermissions();

  const { editUserDialog } = useUsersDialogs();

  const userId = useMemo(
    () => router.query.user_id as UUID,
    [router.query.user_id]
  );

  const { loading, user, error } = useUser(userId);

  const {
    formState: { isDirty, isSubmitting, errors },
    register,
    control,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: user?.fullName,
      username: user?.username,
      email: user?.email,
      status: user?.status,
      role: user?.role as FormData['role'],
    },
  });

  const onSubmit = useCallback(
    async (formData: FormData) => {
      const response = window.confirm(
        '¿Estás seguro que quieres guardar los cambios? Si hace esto tendrá que volver a iniciar sesión'
      );

      if (response) {
        const { user, error } = await updateUser(userId, {
          username: formData.username,
          email: formData.email,
          fullName: formData.fullName,
          status: formData.status,
          role: formData.role?.id,
        });

        if (error) {
          enqueueSnackbar(error.message, { variant: 'error' });
        }

        if (user) {
          await mutate(`${API_ENDPOINTS.USERS}/${user.id}`);

          editUserDialog.close(() => {
            enqueueSnackbar('Usuario editado exitosamente', {
              variant: 'success',
            });
          });
        }
      }
    },
    [userId, mutate, enqueueSnackbar, editUserDialog]
  );

  const handleClose = useCallback(() => {
    isDirty
      ? confirm('¿Estás seguro que deseas cancelar esta acción?') &&
        editUserDialog.close()
      : editUserDialog.close();
  }, [editUserDialog, isDirty]);

  return (
    <Dialog open={editUserDialog.isOpen} fullWidth>
      <DialogTitle>Editar usuario</DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Loader invisible message="Cargando datos del usuario..." />
        ) : error ? (
          <ErrorInfo error={error} />
        ) : user ? (
          <Stack component="form" autoComplete="off" spacing={2}>
            <TextField
              required
              autoComplete="off"
              label="Nombre completo"
              disabled={isSubmitting}
              defaultValue={user.fullName}
              inputProps={register('fullName')}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName?.message}
            />

            <TextField
              required
              autoComplete="off"
              label="Usuario"
              disabled={isSubmitting}
              defaultValue={user.username}
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
              defaultValue={user.email}
              inputProps={register('email')}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />

            {session?.user.role &&
              hasPermissions(session.user.role, 'user::update') &&
              session?.user.id !== user.id && (
                <>
                  <ControlledUserStatusSelect
                    name="status"
                    label="Estado"
                    control={control as unknown as Control}
                    controllerProps={{ defaultValue: user.status }}
                    formControlProps={{
                      required: true,
                      disabled: isSubmitting,
                    }}
                  />

                  <ControlledUsersRolesAutocomplete
                    name="role"
                    label="Rol"
                    control={control as unknown as Control}
                    autocompleteProps={{
                      disabled: isSubmitting,
                      defaultValue: user.role,
                    }}
                    textFieldProps={{ required: true }}
                  />
                </>
              )}
          </Stack>
        ) : (
          <NoData message="No se han encontrado datos del usuario" />
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancelar
        </Button>

        {user && !error && (
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Editar
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
