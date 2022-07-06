import { Dashboard } from '@/components';

import {
  AdminDashboardDrawerHeader,
  AdminDashboardDrawerFooter,
} from './components';
import { useAdminDashboardNavigation } from './hooks';

export const AdminDashboard: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const navigation = useAdminDashboardNavigation();

  return (
    <Dashboard
      drawerHeader={<AdminDashboardDrawerHeader />}
      drawerNavigation={navigation}
      drawerFooter={<AdminDashboardDrawerFooter />}
    >
      {children}
    </Dashboard>
  );
};

export default AdminDashboard;
