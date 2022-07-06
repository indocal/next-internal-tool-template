import { Box, AppBar } from '@mui/material';

import { LayoutHeader, LayoutFooter } from './components';
import { LAYOUT_SIZES } from './config';

export const Layout: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: `${LAYOUT_SIZES.HEADER_HEIGHT} 1fr`,
      gridTemplateAreas: `
        'header'
        'content'
      `,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    }}
  >
    <AppBar position="sticky" sx={{ display: 'grid', gridArea: 'header' }}>
      <LayoutHeader />
    </AppBar>

    <Box
      sx={{
        display: 'grid',
        gridArea: 'content',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
        overflow: 'auto',
      }}
    >
      {children}

      <Box
        sx={{
          marginTop: 'auto',
        }}
      >
        <LayoutFooter />
      </Box>
    </Box>
  </Box>
);

export default Layout;
