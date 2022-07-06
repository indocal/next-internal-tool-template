import { Box, BoxProps } from '@mui/material';

import { ErrorBoundary } from '@/components';

import { WIDGET_SIZES } from './config';

export interface WidgetProps {
  message?: string;
  disableDefaultSizes?: boolean;
  boxProps?: BoxProps;
}

export const Widget: React.FC<React.PropsWithChildren<WidgetProps>> = ({
  message,
  disableDefaultSizes,
  boxProps,
  children,
}) => (
  <ErrorBoundary
    message={message || 'Ha ocurrido un error al cargar este widget'}
  >
    <Box
      sx={{
        ...(!disableDefaultSizes && {
          height: WIDGET_SIZES.HEIGHT,
        }),
      }}
      {...boxProps}
    >
      {children}
    </Box>
  </ErrorBoundary>
);

export default Widget;

////////////////
// Re-exports //
////////////////

export { WIDGET_SIZES } from './config';
