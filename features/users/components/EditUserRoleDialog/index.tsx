import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
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
import { Loader, NoData, ErrorInfo } from '@/components';
import { API_ENDPOINTS } from '@/config';
import { useUserRole, updateUserRole, UUID } from '@/models';

type FormData = zod.infer<typeof schema>;

const schema = zod
  .object(
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
  )
  .partial();

export const EditUserRoleDialog: React.FC = () => {
  const router = useRouter();

  const { mutate } = useSWRConfig();

  const { enqueueSnackbar } = useSnackbar();

  const { editUserRoleDialog } = useUsersDialogs();

  const roleId = useMemo(
    () => router.query.role_id as UUID,
    [router.query.role_id]
  );

  const { loading, role, error } = useUserRole(roleId);

  const {
    formState: { isDirty, isSubmitting, errors },
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: role?.type,
      name: role?.name,
      description: role?.description,
    },
  });

  const onSubmit = useCallback(
    async (formData: FormData) => {
      const { role, error } = await updateUserRole(roleId, {
        type: formData.type,
        name: formData.name,
        description: formData.description,
      });

      if (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }

      if (role) {
        await mutate(`${API_ENDPOINTS.USERS_ROLES}/${role.id}`);

        editUserRoleDialog.close(() => {
          enqueueSnackbar('Rol editado exitosamente', {
            variant: 'success',
          });
        });
      }
    },
    [roleId, mutate, enqueueSnackbar, editUserRoleDialog]
  );

  const handleClose = useCallback(() => {
    isDirty
      ? confirm('¿Estás seguro que deseas cancelar esta acción?') &&
        editUserRoleDialog.close()
      : editUserRoleDialog.close();
  }, [editUserRoleDialog, isDirty]);

  return (
    <Dialog open={editUserRoleDialog.isOpen} fullWidth>
      <DialogTitle>Editar rol</DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Loader invisible message="Cargando datos del rol..." />
        ) : error ? (
          <ErrorInfo error={error} />
        ) : role ? (
          <Stack component="form" autoComplete="off" spacing={2}>
            <TextField
              required
              autoComplete="off"
              label="Tipo"
              disabled={isSubmitting}
              defaultValue={role.type}
              inputProps={register('type')}
              error={Boolean(errors.type)}
              helperText={errors.type?.message}
            />

            <TextField
              required
              autoComplete="off"
              label="Nombre"
              disabled={isSubmitting}
              defaultValue={role.name}
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
              defaultValue={role.description}
              inputProps={register('description')}
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
            />
          </Stack>
        ) : (
          <NoData message="No se han encontrado datos del rol" />
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Cancelar
        </Button>

        {role && !error && (
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

export default EditUserRoleDialog;
