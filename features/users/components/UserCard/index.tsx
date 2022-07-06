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
  ListItemSecondaryAction,
  IconButton,
  Link as MuiLink,
  LinearProgress,
} from '@mui/material';
import {
  Launch as ViewDetailsIcon,
  Edit as EditIcon,
  Mail as MailIcon,
} from '@mui/icons-material';
import qs from 'qs';

import { useCheckPermissions } from '@/auth';
import { useUsersDialogs } from '@/features';
import { Loader, NoData, ErrorInfo } from '@/components';
import { PAGES } from '@/config';
import {
  useUser,
  getShortUUID,
  translateUserStatus,
  UUID,
  User,
} from '@/models';

export interface UserCardProps {
  user: User | UUID;
}

export const UserCard: React.FC<UserCardProps> = ({ user: entity }) => {
  const router = useRouter();

  const { data: session } = useSession();

  const { hasPermissions } = useCheckPermissions();

  const { loading, validating, user, error } = useUser(
    typeof entity === 'string' ? entity : entity.id
  );

  const { editUserDialog } = useUsersDialogs();

  const handleEdit = useCallback(async () => {
    const query = qs.stringify({
      ...router.query,
      user_id: user?.id,
    });

    await router.replace(`${router.pathname}?${query}`, router.asPath);

    editUserDialog.open();
  }, [router, user?.id, editUserDialog]);

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
        <Loader invisible message="Cargando datos del usuario..." />
      ) : error ? (
        <ErrorInfo error={error} />
      ) : user ? (
        <>
          <CardHeader
            subheader="Detalles del usuario"
            action={
              session?.user.role && (
                <Stack direction="row" alignItems="center" spacing={0.25}>
                  {hasPermissions(session.user.role, 'user::read') && (
                    <NextLink passHref href={`${PAGES.ADMIN_USERS}/${user.id}`}>
                      <IconButton
                        LinkComponent={MuiLink}
                        size="small"
                        sx={{ display: 'flex' }}
                      >
                        <ViewDetailsIcon />
                      </IconButton>
                    </NextLink>
                  )}

                  {hasPermissions(session.user.role, 'user::update') && (
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
                <ListItemText primary="ID" secondary={getShortUUID(user.id)} />
              </ListItem>

              <ListItem disablePadding>
                <ListItemText primary="Usuario" secondary={user.username} />
              </ListItem>

              <ListItem disablePadding>
                <ListItemText
                  primary="Nombre completo"
                  secondary={user.fullName}
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemText
                  primary="Correo electrónico"
                  secondary={user.email}
                />

                <ListItemSecondaryAction>
                  <IconButton href={`mailto:${user.email}`}>
                    <MailIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem disablePadding>
                <ListItemText
                  primary="Estado"
                  secondary={translateUserStatus(user.status)}
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemText
                  primary="Rol"
                  secondary={user.role ? user.role.name : 'Sin definir'}
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemText
                  primary="Fecha de creación"
                  secondary={new Date(user.createdAt).toLocaleDateString()}
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemText
                  primary="Última modificación"
                  secondary={new Date(user.updatedAt).toLocaleDateString()}
                />
              </ListItem>
            </List>
          </CardContent>
        </>
      ) : (
        <NoData message="No se han encontrado datos del usuario" />
      )}
    </Card>
  );
};

export default UserCard;
