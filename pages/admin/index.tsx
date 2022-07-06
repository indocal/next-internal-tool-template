import { Container } from '@mui/material';

import { Page, AdminDashboard } from '@/components';
import { EnhancedNextPage } from '@/types';

const OverviewPage: EnhancedNextPage = () => (
  <Page title="Resumen" transition="down">
    <Container fixed sx={{ paddingY: (theme) => theme.spacing(2) }}>
      <h1>Overview</h1>
    </Container>
  </Page>
);

OverviewPage.getLayout = (page) => <AdminDashboard>{page}</AdminDashboard>;

export default OverviewPage;
