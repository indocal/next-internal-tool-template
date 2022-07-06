import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  Card,
  CardContent,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  ManageAccounts as EditProfileIcon,
  NoAccounts as DeleteAccount,
} from '@mui/icons-material';
import qs from 'qs';

import { useDialogs } from '@/context';

export const ProfileSettings: React.FC = () => {
  const router = useRouter();

  const { status, data: session } = useSession();

  const { editUserDialog } = useDialogs();

  const handleEditProfile = useCallback(async () => {
    const query = qs.stringify({
      ...router.query,
      user_id: session?.user.id,
    });

    await router.replace(`${router.pathname}?${query}`, router.asPath);

    editUserDialog.open();
  }, [router, session?.user.id, editUserDialog]);

  return (
    <Card>
      <CardContent sx={{ paddingX: (theme) => theme.spacing(1) }}>
        <List disablePadding>
          <ListSubheader disableSticky>Perfil</ListSubheader>

          <ListItemButton
            divider
            disabled={status === 'loading'}
            onClick={handleEditProfile}
          >
            <ListItemText>Editar perfil</ListItemText>

            <ListItemSecondaryAction>
              <IconButton disableRipple>
                <EditProfileIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItemButton>

          <ListItemButton divider>
            <ListItemText>Borrar cuenta</ListItemText>

            <ListItemSecondaryAction>
              <IconButton disableRipple>
                <DeleteAccount color="error" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItemButton>
        </List>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
