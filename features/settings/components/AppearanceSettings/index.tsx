import { useCallback, startTransition } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  InputBase,
  Button,
  IconButton,
} from '@mui/material';

import {
  ToggleColorModeButton,
  useUserThemePreferences,
  DEFAULT_THEME_COLORS,
} from '@/theme';
import { ToggleDrawerPositionButton, useDashboard } from '@/components';

export const AppearanceSettings: React.FC = () => {
  const {
    colorMode,
    primaryColor,
    secondaryColor,
    setPrimaryColor,
    setSecondaryColor,
    resetPreferences: resetThemePreferences,
  } = useUserThemePreferences();

  const { drawerPosition, resetPreferences: resetDashboardPreferences } =
    useDashboard();

  const handleReset = useCallback(() => {
    const response = window.confirm(
      '¿Estás seguro que deseas restablecer la apariencia por defecto?'
    );

    if (response) {
      resetThemePreferences();
      resetDashboardPreferences();
    }
  }, [resetThemePreferences, resetDashboardPreferences]);

  return (
    <Card>
      <CardContent sx={{ paddingX: (theme) => theme.spacing(1) }}>
        <List disablePadding>
          <ListSubheader disableSticky>Apariencia</ListSubheader>

          <ListItem divider>
            <ListItemText
              primary="Tema"
              secondary={
                colorMode === 'system'
                  ? 'Definido por el sistema'
                  : colorMode === 'light'
                  ? 'Claro'
                  : 'Oscuro'
              }
            />

            <ListItemSecondaryAction>
              <ToggleColorModeButton />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem divider>
            <ListItemText primary="Color principal" secondary={primaryColor} />

            <ListItemSecondaryAction>
              <IconButton size="small">
                <InputBase
                  type="color"
                  value={primaryColor}
                  onChange={(e) => {
                    startTransition(() => setPrimaryColor(e.target.value));
                  }}
                  sx={{
                    border: 'none',
                    width: 25,
                    height: 25,
                    '*::-webkit-color-swatch-wrapper': {
                      padding: 0,
                    },
                    '*::-webkit-color-swatch': {
                      border: 'none',
                      borderRadius: '100%',
                    },
                  }}
                />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem divider>
            <ListItemText
              primary="Color secundario"
              secondary={secondaryColor}
            />

            <ListItemSecondaryAction>
              <IconButton size="small">
                <InputBase
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => {
                    startTransition(() => setSecondaryColor(e.target.value));
                  }}
                  sx={{
                    border: 'none',
                    width: 25,
                    height: 25,
                    '*::-webkit-color-swatch-wrapper': {
                      padding: 0,
                    },
                    '*::-webkit-color-swatch': {
                      border: 'none',
                      borderRadius: '100%',
                    },
                  }}
                />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem divider>
            <ListItemText
              primary="Navegación"
              secondary={drawerPosition === 'left' ? 'Izquierda' : 'Derecha'}
            />

            <ListItemSecondaryAction>
              <ToggleDrawerPositionButton />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="small"
          color="warning"
          disabled={
            primaryColor === DEFAULT_THEME_COLORS.PRIMARY_COLOR &&
            secondaryColor === DEFAULT_THEME_COLORS.SECONDARY_COLOR
          }
          onClick={handleReset}
        >
          Restablecer
        </Button>
      </CardActions>
    </Card>
  );
};

export default AppearanceSettings;
