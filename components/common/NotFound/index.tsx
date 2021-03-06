import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Stack, Typography, Button } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

import { PAGES } from '@/config';

import { notFound as notFoundImage } from './assets';

export interface NotFoundProps {
  caption?: string;
  description?: string;
  fallbackUrl?: string;
}

export const NotFound: React.FC<NotFoundProps> = ({
  caption = 'Recurso no encontrado',
  description = 'El servidor web no pudo encontrar el recurso solicitado',
  fallbackUrl,
}) => {
  const router = useRouter();

  const isAdminPage = useMemo(
    () => router.asPath.startsWith(PAGES.ADMIN_ROOT),
    [router.asPath]
  );

  return (
    <Box
      sx={{
        display: 'grid',
        placeContent: 'center',
        placeItems: 'center',
        gap: (theme) => theme.spacing(3),
        width: '100%',
        height: '100%',
        padding: (theme) => theme.spacing(4),
        overflow: 'auto',
      }}
    >
      <Stack>
        <Typography variant="h4" align="center">
          {caption}
        </Typography>

        <Typography
          variant="caption"
          align="center"
          fontWeight="bolder"
          color="textSecondary"
        >
          {description}
        </Typography>
      </Stack>

      <Box sx={{ maxWidth: (theme) => theme.spacing(22.5) }}>
        <Image priority alt={caption} src={notFoundImage} />
      </Box>

      <Button
        fullWidth
        size="small"
        variant="contained"
        color="primary"
        endIcon={<HomeIcon />}
        onClick={() =>
          router.replace(
            fallbackUrl || isAdminPage ? PAGES.ADMIN_ROOT : PAGES.ROOT
          )
        }
      >
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFound;
