import { Container } from '@mui/material';

import { Page, Layout, NotFound } from '@/components';
import { EnhancedNextPage } from '@/types';

const NotFoundPage: EnhancedNextPage = () => (
  <Page title="404: Recurso no encontrado">
    <Container fixed sx={{ paddingY: (theme) => theme.spacing(2) }}>
      <NotFound />
    </Container>
  </Page>
);

NotFoundPage.getLayout = (page) => <Layout>{page}</Layout>;

export default NotFoundPage;
