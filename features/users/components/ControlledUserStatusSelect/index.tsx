import { useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { MenuItem } from '@mui/material';

import { useCheckPermissions } from '@/auth';
import { ControlledSelect, ControlledSelectProps } from '@/components';
import { translateUserStatus, UserStatus } from '@/models';

export type ControlledUserStatusSelectProps = ControlledSelectProps;

export const ControlledUserStatusSelect: React.FC<
  ControlledUserStatusSelectProps
> = (props) => {
  const { data: session } = useSession();

  const { hasPermissions } = useCheckPermissions();

  const status = useMemo<UserStatus[]>(() => ['ENABLED', 'DISABLED'], []);

  return session?.user.role &&
    hasPermissions(
      session.user.role,
      ['userRole::create', 'userRole::update'],
      { strategy: 'some' }
    ) ? (
    <ControlledSelect {...props}>
      {status.map((status) => (
        <MenuItem key={status} value={status}>
          {translateUserStatus(status)}
        </MenuItem>
      ))}
    </ControlledSelect>
  ) : (
    <ControlledSelect selectProps={{ disabled: true }} {...props}>
      <MenuItem value={session?.user.status}>
        {translateUserStatus(session?.user.status || 'DISABLED')}
      </MenuItem>
    </ControlledSelect>
  );
};

export default ControlledUserStatusSelect;
