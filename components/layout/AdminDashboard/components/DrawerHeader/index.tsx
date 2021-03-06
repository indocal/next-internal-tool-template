import { useSession } from 'next-auth/react';
import { Box, Paper, Stack, Typography, Avatar, Skeleton } from '@mui/material';

export const AdminDashboardDrawerHeader: React.FC = () => {
  const { status, data: session } = useSession();

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Stack
        component={Paper}
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          height: '100%',
          padding: (theme) => theme.spacing(0.75),
          borderRadius: (theme) => theme.spacing(1),
        }}
      >
        {status === 'authenticated' ? (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ width: '100%', height: '100%' }}
          >
            <Avatar
              alt={session?.user.fullName}
              sx={{ width: 40, height: 40 }}
            />

            <Stack sx={{ width: '100%' }}>
              <Typography
                sx={{
                  maxWidth: '17ch',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {session?.user.fullName}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  maxWidth: '22ch',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {session?.user.email}
              </Typography>
            </Stack>
          </Stack>
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ width: '100%', height: '100%' }}
          >
            <Skeleton variant="circular" width={40} height={40}>
              <Avatar />
            </Skeleton>

            <Stack
              sx={{
                width: '100%',
                paddingBottom: (theme) => theme.spacing(0.5),
              }}
            >
              <Skeleton variant="text" height={25} />
              <Skeleton variant="text" height={15} />
            </Stack>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default AdminDashboardDrawerHeader;
