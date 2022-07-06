import { useMemo } from 'react';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  Link as MuiLink,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  AddCircle as AddIcon,
  Launch as ViewDetailsIcon,
} from '@mui/icons-material';
import { GridColumns, GridRowsProp } from '@mui/x-data-grid';

import { useCheckPermissions } from '@/auth';
import { EnhancedDataGrid, EnhancedDataGridProps } from '@/features';
import { PAGES } from '@/config';
import { getShortUUID, translateUserStatus, User } from '@/models';

export interface UsersDataGridProps {
  title: string;
  users: User[];
  onRefreshButtonClick?: () => void | Promise<void>;
  onAddButtonClick?: () => void | Promise<void>;
  enhancedDataGridProps?: Omit<EnhancedDataGridProps, 'columns' | 'rows'>;
}

export const UsersDataGrid: React.FC<UsersDataGridProps> = ({
  title,
  users,
  onRefreshButtonClick,
  onAddButtonClick,
  enhancedDataGridProps,
}) => {
  const { data: session } = useSession();

  const { hasPermissions } = useCheckPermissions();

  const columns = useMemo<GridColumns>(
    () => [
      {
        hide:
          !!session?.user.role &&
          !hasPermissions(session.user.role, 'user::read'),
        field: 'actions',
        headerName: 'Acciones',
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        width: 120,
        disableExport: true,
        renderCell: ({ id }) => (
          <NextLink passHref href={`${PAGES.ADMIN_USERS}/${id}`}>
            <IconButton
              LinkComponent={MuiLink}
              size="small"
              sx={{ display: 'flex' }}
            >
              <ViewDetailsIcon />
            </IconButton>
          </NextLink>
        ),
      },
      {
        field: 'id',
        headerName: 'ID',
        headerAlign: 'left',
        align: 'left',
        width: 100,
        valueFormatter: ({ value }) => getShortUUID(value),
      },
      {
        field: 'username',
        headerName: 'Usuario',
        headerAlign: 'center',
        align: 'center',
        minWidth: 250,
        flex: 1,
      },
      {
        field: 'email',
        headerName: 'Correo electrónico',
        headerAlign: 'center',
        align: 'center',
        minWidth: 250,
        flex: 1,
      },
      {
        field: 'status',
        headerName: 'Estado',
        headerAlign: 'center',
        align: 'center',
        minWidth: 175,
        flex: 1,
        valueFormatter: ({ value }) => translateUserStatus(value),
      },
      {
        field: 'role',
        headerName: 'Rol',
        headerAlign: 'center',
        align: 'center',
        minWidth: 175,
        flex: 1,
        valueGetter: ({ value: role }) => (role ? role.name : 'Sin definir'),
      },
      {
        field: 'updatedAt',
        headerName: 'Última modificación',
        headerAlign: 'right',
        align: 'right',
        minWidth: 175,
        valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
      },
    ],
    [session, hasPermissions]
  );

  const rows = useMemo<GridRowsProp>(
    () =>
      users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
        updatedAt: user.updatedAt,
      })),
    [users]
  );

  return (
    <Box component={Paper} sx={{ height: '100%' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          height: 75,
          paddingX: (theme) => theme.spacing(2),
          borderBottom: (theme) => `1px dashed ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            maxWidth: ['12ch', '20ch', '100%'],
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>

        <Stack direction="row" spacing={0.25}>
          {onRefreshButtonClick && (
            <IconButton size="small" onClick={onRefreshButtonClick}>
              <RefreshIcon />
            </IconButton>
          )}

          {onAddButtonClick &&
            session?.user.role &&
            hasPermissions(session.user.role, 'user::create') && (
              <IconButton size="small" onClick={onAddButtonClick}>
                <AddIcon />
              </IconButton>
            )}
        </Stack>
      </Stack>

      <Box sx={{ height: 'calc(100% - 75px)' }}>
        <EnhancedDataGrid
          columns={columns}
          rows={rows}
          disableColumnMenu
          disableSelectionOnClick
          sx={{ border: 'none' }}
          {...enhancedDataGridProps}
        />
      </Box>
    </Box>
  );
};

export default UsersDataGrid;
