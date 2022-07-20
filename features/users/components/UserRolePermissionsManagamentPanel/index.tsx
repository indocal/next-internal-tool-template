import {
  Paper,
  Stack,
  Typography,
  Button,
  LinearProgress,
} from '@mui/material';
import { CloudSync as SaveIcon } from '@mui/icons-material';

import { Loader, NoData, ErrorInfo } from '@/components';
import { UserRole } from '@/models';

import {
  UserRolePermissionsManagamentPanelProvider,
  useUserRolePermissionsManagamentPanel,
} from './context';
import { UserRolePermissionsManagamentPanelModelPermissions } from './components';
import { useUserRolePermissionsByRole } from './hooks';

export interface UserRolePermissionsManagamentPanelProps {
  role: UserRole;
}

const UserRolePermissionsManagamentPanel: React.FC<
  UserRolePermissionsManagamentPanelProps
> = ({ role }) => {
  const { loading, validating, permissions, error } =
    useUserRolePermissionsByRole(role);

  const { save } = useUserRolePermissionsManagamentPanel();

  return (
    <Paper sx={{ display: 'grid' }}>
      {loading ? (
        <Loader invisible message="Cargando permisos..." />
      ) : error ? (
        <ErrorInfo error={error} />
      ) : permissions ? (
        <Stack
          sx={{ position: 'relative', padding: (theme) => theme.spacing(1, 2) }}
        >
          {validating && (
            <LinearProgress
              sx={{ position: 'absolute', width: '100%', top: 0, left: 0 }}
            />
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            sx={{
              padding: (theme) => theme.spacing(1),
              borderBottom: (theme) => `1px dashed ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Permisos
            </Typography>

            <Button
              size="small"
              variant="contained"
              color="secondary"
              endIcon={<SaveIcon />}
              onClick={async () => await save()}
            >
              Guardar
            </Button>
          </Stack>

          <Stack sx={{ padding: (theme) => theme.spacing(1) }}>
            {Object.entries(permissions).map(([model, permissions]) => (
              <UserRolePermissionsManagamentPanelModelPermissions
                key={model}
                role={role}
                model={model}
                permissions={permissions}
              />
            ))}
          </Stack>
        </Stack>
      ) : (
        <NoData message="Sin permisos a mostrar" />
      )}
    </Paper>
  );
};

const UserRolePermissionsManagamentPanelWrapper: React.FC<
  UserRolePermissionsManagamentPanelProps
> = ({ role }) => (
  <UserRolePermissionsManagamentPanelProvider>
    <UserRolePermissionsManagamentPanel role={role} />
  </UserRolePermissionsManagamentPanelProvider>
);

export { UserRolePermissionsManagamentPanelWrapper as UserRolePermissionsManagamentPanel };

export default UserRolePermissionsManagamentPanel;
