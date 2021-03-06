import { useMemo } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Tooltip,
  Link as MuiLink,
  useTheme,
} from '@mui/material';

import { PAGES } from '@/config';

import { useDashboard } from '../../../../context';
import { DrawerNavigationItem } from '../../types';

export interface DashboardDrawerNavigationItemProps {
  item: DrawerNavigationItem;
  nested?: boolean;
}

export const DashboardDrawerNavigationItem: React.FC<
  DashboardDrawerNavigationItemProps
> = ({ item, nested }) => {
  const theme = useTheme();

  const router = useRouter();

  const { isDrawerOpen, drawerPosition } = useDashboard();

  const isCurrentPath = useMemo<boolean>(
    () =>
      [PAGES.ROOT, PAGES.ADMIN_ROOT].some((page) => router.pathname === page)
        ? router.pathname === item.href
        : router.pathname.includes(item.href) &&
          item.href !== PAGES.ROOT &&
          item.href !== PAGES.ADMIN_ROOT,
    [item.href, router.pathname]
  );

  const textColor = useMemo(
    () =>
      nested && !isCurrentPath
        ? theme.palette.text.disabled
        : isCurrentPath
        ? theme.palette.secondary.main
        : 'inherit',
    [
      nested,
      isCurrentPath,
      theme.palette.secondary.main,
      theme.palette.text.disabled,
    ]
  );

  return (
    <NextLink passHref href={item.href}>
      <MuiLink color="inherit" underline="none">
        <Tooltip
          title={isDrawerOpen ? '' : item.label}
          placement={drawerPosition === 'left' ? 'right' : 'left'}
        >
          <ListItemButton
            sx={{
              borderRadius: (theme) => theme.spacing(1),
              ...(isDrawerOpen && {
                margin: (theme) => theme.spacing(0.5, 1),
              }),
              ...(!isDrawerOpen && {
                padding: (theme) => theme.spacing(1.5, 2),
              }),
              ...(nested && {
                margin: (theme) => theme.spacing(0.5, 2),
              }),
            }}
          >
            <ListItemIcon
              sx={{
                display: 'flex',
                minWidth: 'fit-content',
                marginRight: (theme) => theme.spacing(2),
                color: textColor,
              }}
            >
              {item.icon}
            </ListItemIcon>

            {isDrawerOpen && (
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  sx: {
                    color: textColor,
                    ...(nested && {
                      fontSize: (theme) => theme.typography.caption,
                    }),
                    ...(isCurrentPath && {
                      fontWeight: 'bolder',
                    }),
                  },
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </MuiLink>
    </NextLink>
  );
};

export default DashboardDrawerNavigationItem;
