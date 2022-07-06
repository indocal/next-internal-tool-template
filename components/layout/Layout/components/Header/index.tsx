import { Box, Toolbar } from '@mui/material';

import { Logo } from '@/components';

export const LayoutHeader: React.FC = () => (
  <Toolbar
    sx={{
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
    }}
  >
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '3 / 1',
        height: (theme) => theme.spacing(5),
      }}
    >
      <Logo variant="full" />
    </Box>
  </Toolbar>
);

export default LayoutHeader;
