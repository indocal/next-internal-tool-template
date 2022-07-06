import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { signIn, SignInResponse } from 'next-auth/react';
import {
  Box,
  Stack,
  Paper,
  Grid,
  TextField,
  Avatar,
  Typography,
  Link,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import { PasswordTextField } from '@/components';
import { PAGES, BRAND } from '@/config';

import { useAuthDialogs } from '../../context';
import { Credentials } from '../../types';

import { sideImage } from './assets';

type FormData = zod.infer<typeof schema>;

const schema: zod.ZodSchema<Credentials> = zod.object(
  {
    identifier: zod
      .string({
        description: 'Usuario o correo electrónico',
        required_error: 'Debe ingresar su usuario o su correo electrónico',
        invalid_type_error: 'Formato no válido',
      })
      .min(1, 'Debe ingresar su usuario o su correo electrónico'),

    password: zod
      .string({
        description: 'Contraseña',
        required_error: 'Debe ingresar su contraseña',
        invalid_type_error: 'Formato no válido',
      })
      .min(1, 'Debe ingresar su contraseña'),
  },
  {
    description: 'Credenciales de inicio de sesión',
    required_error: 'Debe ingresar sus credenciales de inicio de sesión',
    invalid_type_error: 'Formato no válido',
  }
);

export const SignIn: React.FC = () => {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const { restorePasswordDialog } = useAuthDialogs();

  const {
    formState: { isSubmitting, errors },
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (formData: FormData) => {
      const { ok, url, error } = (await signIn('credentials', {
        identifier: formData.identifier,
        password: formData.password,
        redirect: false,
      })) as unknown as SignInResponse;

      if (error) enqueueSnackbar(error, { variant: 'error' });

      if (ok && !error) {
        if (url) {
          const { searchParams } = new URL(url);

          const callbackUrl = searchParams.get('callbackUrl');

          await router.push(callbackUrl ?? PAGES.ROOT);
        } else {
          await router.push(PAGES.ROOT);
        }
      }
    },
    [router, enqueueSnackbar]
  );

  return (
    <Grid
      container
      sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      <Grid
        item
        xs={0}
        sm={6}
        md={8}
        sx={{
          backgroundImage: `url(${sideImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
        }}
      />

      <Grid
        component={Paper}
        square
        item
        xs={12}
        sm={6}
        md={4}
        elevation={6}
        sx={{ position: 'relative', paddingX: (theme) => theme.spacing(2) }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginY: (theme) => theme.spacing(8),
          }}
        >
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="h5" align="center">
            Iniciar sesión
          </Typography>

          <Stack
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              width: '100%',
              maxWidth: [275, 250, 250, 300, 350],
              marginTop: (theme) => theme.spacing(2),
            }}
          >
            <TextField
              required
              margin="dense"
              autoComplete="username"
              label="Usuario o Correo electrónico"
              disabled={isSubmitting}
              inputProps={register('identifier')}
              error={Boolean(errors.identifier)}
              helperText={errors.identifier?.message}
            />

            <PasswordTextField
              required
              margin="dense"
              autoComplete="current-password"
              label="Contraseña"
              disabled={isSubmitting}
              inputProps={register('password')}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
                marginTop: (theme) => theme.spacing(0.75),
                marginBottom: (theme) => theme.spacing(2),
              }}
            >
              Iniciar sesión
            </LoadingButton>

            <Link
              onClick={() => restorePasswordDialog.open()}
              sx={{
                ':hover': {
                  cursor: 'pointer',
                },
              }}
            >
              ¿Ha olvidado la contraseña?
            </Link>
          </Stack>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            left: '25%',
            right: '25%',
            bottom: (theme) => [
              theme.spacing(2),
              theme.spacing(4),
              theme.spacing(6),
            ],
          }}
        >
          <Typography
            variant="caption"
            align="center"
            color="GrayText"
            sx={{
              display: 'block',
              fontWeight: 'bolder',
            }}
          >
            {`© ${new Date().getFullYear()} ${
              BRAND.NAME
            } - Todos los derechos reservados`}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
