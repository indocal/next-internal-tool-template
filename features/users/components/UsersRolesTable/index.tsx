import { useCallback } from 'react';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Paper,
  Stack,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  IconButton,
  Link as MuiLink,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useSWRConfig } from 'swr';

import { useCheckPermissions } from '@/auth';
import { useUsersDialogs } from '@/features';
import { Loader, NoData, ErrorInfo } from '@/components';
import { PAGES, API_ENDPOINTS } from '@/config';
import { useUsersRoles, deleteUserRole, UUID } from '@/models';

export const UsersRolesTable: React.FC = () => {
  const { data: session } = useSession();

  const { mutate } = useSWRConfig();

  const { enqueueSnackbar } = useSnackbar();

  const { hasPermissions } = useCheckPermissions();

  const { addUserRoleDialog } = useUsersDialogs();

  const { loading, validating, roles, error } = useUsersRoles();

  const handleDeleteRole = useCallback(
    async (id: UUID) => {
      const response = window.confirm(
        '¿Estás seguro que deseas eliminar este rol?'
      );

      if (response) {
        const { error } = await deleteUserRole(id);

        if (error) {
          enqueueSnackbar(error.message, { variant: 'error' });
        } else {
          await mutate(API_ENDPOINTS.USERS_ROLES);

          enqueueSnackbar('Rol eliminado correctamente', {
            variant: 'success',
          });
        }
      }
    },
    [mutate, enqueueSnackbar]
  );

  return (
    <Paper sx={{ display: 'grid' }}>
      {loading ? (
        <Loader invisible message="Cargando roles..." />
      ) : error ? (
        <ErrorInfo error={error} />
      ) : (
        <Stack sx={{ position: 'relative' }}>
          {validating && (
            <LinearProgress
              sx={{ position: 'absolute', width: '100%', top: 0, left: 0 }}
            />
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              gap: (theme) => theme.spacing(1),
              padding: (theme) => theme.spacing(2),
              borderBottom: (theme) => `1px dashed ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Roles
            </Typography>

            {session?.user.role &&
              hasPermissions(session.user.role, 'userRole::create') && (
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  disabled={validating}
                  endIcon={<AddIcon />}
                  onClick={() => addUserRoleDialog.open()}
                >
                  Nuevo rol
                </Button>
              )}
          </Stack>

          <Stack sx={{ height: '100%' }}>
            {roles.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Rol</TableCell>
                      <TableCell>Descripción</TableCell>

                      {session?.user.role && (
                        <TableCell
                          align="center"
                          sx={{
                            borderLeft: (theme) =>
                              `1px solid ${theme.palette.divider}`,
                          }}
                        >
                          --
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {roles
                      .filter((role) => role.origin === 'SYSTEM')
                      .map((role) => (
                        <TableRow key={role.id}>
                          <TableCell>{role.name}</TableCell>
                          <TableCell>{role.description}</TableCell>

                          {session?.user.role && (
                            <TableCell
                              align="center"
                              sx={{
                                borderLeft: (theme) =>
                                  `1px solid ${theme.palette.divider}`,
                              }}
                            >
                              <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={0.25}
                              >
                                <NextLink
                                  passHref
                                  href={`${PAGES.ADMIN_USERS_ROLES}/${role.id}`}
                                >
                                  <IconButton
                                    LinkComponent={MuiLink}
                                    size="small"
                                    disabled={
                                      validating ||
                                      !hasPermissions(
                                        session.user.role,
                                        'userRole::update'
                                      )
                                    }
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </NextLink>
                              </Stack>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}

                    {roles.some((role) => role.origin === 'USER') && (
                      <TableRow sx={{ border: 'none' }}>
                        <TableCell colSpan={3} padding="none">
                          <Divider
                            orientation="horizontal"
                            variant="fullWidth"
                            sx={{
                              margin: (theme) => theme.spacing(1),
                              borderBottom: (theme) =>
                                `${theme.spacing(0.25)} dotted ${
                                  theme.palette.divider
                                }`,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    )}

                    {roles
                      .filter((role) => role.origin === 'USER')
                      .map((role) => (
                        <TableRow key={role.id}>
                          <TableCell>{role.name}</TableCell>
                          <TableCell>{role.description}</TableCell>

                          {session?.user.role && (
                            <TableCell
                              align="center"
                              sx={{
                                borderLeft: (theme) =>
                                  `1px solid ${theme.palette.divider}`,
                              }}
                            >
                              <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={0.25}
                              >
                                <NextLink
                                  passHref
                                  href={`${PAGES.ADMIN_USERS_ROLES}/${role.id}`}
                                >
                                  <IconButton
                                    LinkComponent={MuiLink}
                                    size="small"
                                    disabled={
                                      validating ||
                                      !hasPermissions(
                                        session.user.role,
                                        'userRole::update'
                                      )
                                    }
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </NextLink>

                                <IconButton
                                  size="small"
                                  disabled={
                                    validating ||
                                    !hasPermissions(
                                      session.user.role,
                                      'userRole::delete'
                                    )
                                  }
                                  onClick={() => handleDeleteRole(role.id)}
                                >
                                  <DeleteIcon fontSize="small" color="error" />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <NoData message="Sin roles a mostrar" />
            )}
          </Stack>
        </Stack>
      )}
    </Paper>
  );
};

export default UsersRolesTable;
