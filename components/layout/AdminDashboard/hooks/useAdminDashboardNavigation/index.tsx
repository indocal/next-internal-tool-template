import { useSession } from 'next-auth/react';
import {
  Dashboard as OverviewIcon,
  AdminPanelSettings as UsersIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

import { useCheckPermissions } from '@/auth';
import { DrawerNavigation } from '@/components';
import { PAGES } from '@/config';

export function useAdminDashboardNavigation(): DrawerNavigation {
  const { data: session } = useSession();

  const { hasPermissions } = useCheckPermissions();

  const items: DrawerNavigation = [
    {
      type: 'ITEM',
      value: {
        label: 'Resumen',
        icon: <OverviewIcon />,
        href: PAGES.ADMIN_ROOT,
      },
    },
    {
      type: 'ITEM',
      value: {
        label: 'Usuarios',
        icon: <UsersIcon />,
        href: PAGES.ADMIN_USERS,
      },
    },
    {
      type: 'ITEM',
      value: {
        label: 'Configuración',
        icon: <SettingsIcon />,
        href: PAGES.ADMIN_SETTINGS,
      },
    },
  ];

  return items.filter((item) => {
    if (item.type === 'ITEM') {
      switch (item.value.href) {
        case PAGES.ADMIN_USERS:
          return (
            session?.user.role &&
            hasPermissions(
              session.user.role,
              ['user::create', 'user::update', 'user::delete'],
              { strategy: 'some' }
            )
          );
      }
    }

    return true;
  });
}

export default useAdminDashboardNavigation;
