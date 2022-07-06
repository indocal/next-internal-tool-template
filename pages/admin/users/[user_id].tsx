import { useRouter } from 'next/router';
import { Container, Grid } from '@mui/material';

import { UserCard, UserRoleCard } from '@/features';
import {
  Page,
  AdminDashboard,
  Widget,
  Loader,
  NotFound,
  ErrorInfo,
} from '@/components';
import { useUser, UUID } from '@/models';
import { EnhancedNextPage } from '@/types';

const UserPage: EnhancedNextPage = () => {
  const router = useRouter();

  const { loading, user, error } = useUser(router.query.user_id as UUID);

  return (
    <Page
      transition="right"
      title={
        loading
          ? 'Cargando...'
          : user
          ? `Usuario: ${user.username}`
          : 'Usuario no encontrado'
      }
    >
      <Container fixed sx={{ paddingY: (theme) => theme.spacing(2) }}>
        {loading ? (
          <Loader invisible message="Cargando datos..." />
        ) : error ? (
          <ErrorInfo error={error} />
        ) : user ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={12} md={8}>
              <Widget>
                <UserCard user={user} />
              </Widget>
            </Grid>

            {user.role && (
              <Grid item xs={12} md={4}>
                <Widget>
                  <UserRoleCard role={user.role} />
                </Widget>
              </Grid>
            )}
          </Grid>
        ) : (
          <NotFound />
        )}
      </Container>
    </Page>
  );
};

UserPage.getLayout = (page) => <AdminDashboard>{page}</AdminDashboard>;

export default UserPage;
