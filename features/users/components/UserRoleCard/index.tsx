import { useCallback } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Stack,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Link as MuiLink,
  LinearProgress,
} from '@mui/material';
import { Handyman as ManageIcon, Edit as EditIcon } from '@mui/icons-material';
import qs from 'qs';

import { useCheckPermissions } from '@/auth';
import { useUsersDialogs } from '@/features';
import { Loader, NoData, ErrorInfo } from '@/components';
import { PAGES } from '@/config';
import { useUserRole, getShortUUID, UUID, UserRole } from '@/models';

export interface UserRoleCardProps {
  role: UserRole | UUID;
}

export const UserRoleCard: React.FC<UserRoleCardProps> = ({ role: entity }) => {
  const router = useRouter();

  const { data: session } = useSession();

  const { hasPermissions } = useCheckPermissions();

  const { loading, validating, role, error } = useUserRole(
    typeof entity === 'string' ? entity : entity.id
  );

  const { editUserRoleDialog } = useUsersDialogs();

  const handleEdit = useCallback(async () => {
    const query = qs.stringify({
      ...router.query,
      role_id: role?.id,
    });

    await router.replace(`${router.pathname}?${query}`, router.asPath);

    editUserRoleDialog.open();
  }, [router, role?.id, editUserRoleDialog]);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      {loading ? (
        <Loader invisible message="Cargando datos del rol..." />
      ) : error ? (
        <ErrorInfo error={error} />
      ) : role ? (
        <>
          <CardHeader
            subheader="Detalles del rol"
            action={
              session?.user.role && (
                <Stack direction="row" alignItems="center" spacing={0.25}>
                  {hasPermissions(session.user.role, 'userRole::read') && (
                    <NextLink passHref href={PAGES.ADMIN_USERS_ROLES}>
                      <IconButton
                        LinkComponent={MuiLink}
                        size="small"
                        sx={{ display: 'flex' }}
                      >
                        <ManageIcon />
                      </IconButton>
                    </NextLink>
                  )}

                  {hasPermissions(session.user.role, 'userRole::update') && (
                    <IconButton size="small" onClick={handleEdit}>
                      <EditIcon />
                    </IconButton>
                  )}
                </Stack>
              )
            }
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          />

          <CardContent
            sx={{
              position: 'relative',
              height: '100%',
              overflow: 'auto',
            }}
          >
            {validating && (
              <LinearProgress
                sx={{ position: 'absolute', width: '100%', top: 0, left: 0 }}
              />
            )}

            <List disablePadding>
              <ListItem disablePadding>
                <ListItemText primary="ID" secondary={getShortUUID(role.id)} />
              </ListItem>

              <ListItem disablePadding>
                <ListItemText primary="Rol" secondary={role.name} />
              </ListItem>

              <ListItem disablePadding>
                <ListItemText
                  primary="Descripción"
                  secondary={role.description}
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemText
                  primary="Origen"
                  secondary={`Definido por ${
                    role.origin === 'SYSTEM' ? 'el sistema' : 'el usuario'
                  }`}
                />
              </ListItem>
            </List>
          </CardContent>
        </>
      ) : (
        <NoData message="No se han encontrado datos del rol" />
      )}
    </Card>
  );
};

export default UserRoleCard;
