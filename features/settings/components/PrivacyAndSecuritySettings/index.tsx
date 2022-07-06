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
import { Password as PasswordIcon } from '@mui/icons-material';

import { useAuthDialogs } from '@/auth';

export const PrivacyAndSecuritySettings: React.FC = () => {
  const { changePasswordDialog } = useAuthDialogs();

  return (
    <Card>
      <CardContent sx={{ paddingX: (theme) => theme.spacing(1) }}>
        <List disablePadding>
          <ListSubheader disableSticky>Privacidad y Seguridad</ListSubheader>

          <ListItemButton divider onClick={() => changePasswordDialog.open()}>
            <ListItemText>Cambiar contraseña</ListItemText>

            <ListItemSecondaryAction>
              <IconButton disableRipple>
                <PasswordIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItemButton>
        </List>
      </CardContent>
    </Card>
  );
};

export default PrivacyAndSecuritySettings;
