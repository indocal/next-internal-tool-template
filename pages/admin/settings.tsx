import { Container, Grid } from '@mui/material';

import {
  ProfileSettings,
  PrivacyAndSecuritySettings,
  AppearanceSettings,
} from '@/features';
import { Page, AdminDashboard, Widget } from '@/components';
import { EnhancedNextPage } from '@/types';

const SettingsPage: EnhancedNextPage = () => (
  <Page title="Configuración" transition="down">
    <Container fixed sx={{ paddingY: (theme) => theme.spacing(2) }}>
      <Grid container justifyContent="center" alignItems="center" spacing={1}>
        <Grid item xs={12}>
          <Widget disableDefaultSizes>
            <ProfileSettings />
          </Widget>
        </Grid>

        <Grid item xs={12}>
          <Widget disableDefaultSizes>
            <PrivacyAndSecuritySettings />
          </Widget>
        </Grid>

        <Grid item xs={12}>
          <Widget disableDefaultSizes>
            <AppearanceSettings />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  </Page>
);

SettingsPage.getLayout = (page) => <AdminDashboard>{page}</AdminDashboard>;

export default SettingsPage;
