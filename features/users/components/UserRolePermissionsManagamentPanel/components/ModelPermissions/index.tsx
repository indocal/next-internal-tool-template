import {
  Box,
  Grid,
  Stack,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import { Permissions } from '@/auth';
import { UserRole } from '@/models';

import { translateModel, translatePermissionAction } from '../../utils';

export interface UserRolePermissionsManagamentPanelModelPermissionsProps {
  role: UserRole;
  model: string;
  permissions: Permissions;
}

export const UserRolePermissionsManagamentPanelModelPermissions: React.FC<
  UserRolePermissionsManagamentPanelModelPermissionsProps
> = ({ permissions, model }) => {
  return (
    <Accordion key={model} defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color="text.secondary" sx={{ fontWeight: 'bold' }}>
          {translateModel(model)}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={2} divider={<Divider flexItem />}>
          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              <Box
                sx={{
                  flex: 1,
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                }}
              />

              <Checkbox />
            </Stack>

            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              {Object.entries(permissions).map(([permission, value]) => (
                <Grid
                  key={permission}
                  item
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                  xs
                >
                  <FormControlLabel
                    label={translatePermissionAction(permission)}
                    control={<Checkbox checked={value} />}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserRolePermissionsManagamentPanelModelPermissions;
