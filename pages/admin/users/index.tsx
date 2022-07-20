import NextLink from 'next/link';
import { useSession } from 'next-auth/react';
import { Container, Grid, Alert, Button, Link as MuiLink } from '@mui/material';
import { Launch as ViewDetailsIcon } from '@mui/icons-material';

import { useCheckPermissions } from '@/auth';
import { UsersDataGrid, useUsersDialogs } from '@/features';
import { Page, AdminDashboard, Widget } from '@/components';
import { PAGES } from '@/config';
import { useUsers } from '@/models';
import { EnhancedNextPage } from '@/types';

const UsersPage: EnhancedNextPage = () => {
  const { data: session } = useSession();

  const { hasPermissions } = useCheckPermissions();

  const { loading, validating, users, error, refetch } = useUsers();

  const { addUserDialog } = useUsersDialogs();

  return (
    <Page title="Usuarios" transition="down">
      <Container fixed sx={{ paddingY: (theme) => theme.spacing(2) }}>
        <Grid container spacing={1}>
          {session?.user.role &&
            hasPermissions(session.user.role, 'userRole::update') && (
              <Grid item xs={12}>
                <Alert
                  severity="info"
                  action={
                    <NextLink passHref href={PAGES.ADMIN_USERS_ROLES}>
                      <Button
                        LinkComponent={MuiLink}
                        size="small"
                        color="info"
                        endIcon={<ViewDetailsIcon />}
                      >
                        Configurar
                      </Button>
                    </NextLink>
                  }
                >
                  Roles y permisos
                </Alert>
              </Grid>
            )}

          <Grid item xs={12}>
            <Widget boxProps={{ sx: { height: 500 } }}>
              <UsersDataGrid
                title="Usuarios"
                users={users}
                onRefreshButtonClick={refetch}
                onAddButtonClick={() => addUserDialog.open()}
                enhancedDataGridProps={{
                  loading: loading || validating,
                  error: error,
                }}
              />
            </Widget>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

UsersPage.getLayout = (page) => <AdminDashboard>{page}</AdminDashboard>;

export default UsersPage;
