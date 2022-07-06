import { Container } from '@mui/material';

import { Page, Layout } from '@/components';
import { EnhancedNextPage } from '@/types';

const HomePage: EnhancedNextPage = () => (
  <Page title="Home">
    <Container fixed sx={{ paddingY: (theme) => theme.spacing(2) }}>
      <h1>Home</h1>
    </Container>
  </Page>
);

HomePage.getLayout = (page) => <Layout>{page}</Layout>;

export default HomePage;
