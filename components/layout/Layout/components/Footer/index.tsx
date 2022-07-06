import { Box, Paper, Typography } from '@mui/material';

import { Logo } from '@/components';
import { BRAND } from '@/config';

export const LayoutFooter: React.FC = () => {
  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(2),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          '::before': {
            content: '""',
            flexGrow: 1,
            marginRight: (theme) => theme.spacing(2),
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          },
          '::after': {
            content: '""',
            flexGrow: 1,
            marginLeft: (theme) => theme.spacing(2),
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '1 / 1',
            width: (theme) => theme.spacing(5),
          }}
        >
          <Logo variant="short" />
        </Box>
      </Box>

      <Typography
        variant="caption"
        sx={{
          display: 'block',
          width: '100%',
          marginTop: (theme) => theme.spacing(2),
          textAlign: 'center',
          fontWeight: 'bolder',
        }}
      >
        {`© ${new Date().getFullYear()} ${
          BRAND.NAME
        } - Todos los derechos reservados`}
      </Typography>
    </Paper>
  );
};

export default LayoutFooter;
