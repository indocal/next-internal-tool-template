import { useReducer, useCallback, useContext, createContext } from 'react';
import { useSnackbar } from 'notistack';

import { PermissionsByModel } from '@/auth';

///////////
// State //
///////////

const initialContextState: UserRolePermissionsManagamentPanelContextState = {
  touchedPermissions: {},
};

interface UserRolePermissionsManagamentPanelContextState {
  touchedPermissions: PermissionsByModel;
}

type UserRolePermissionsManagamentPanelContextStateAction = {
  type: 'TOGGLE_PERMISSION';
  model: string;
  permission: string;
};

function reducer(
  state: UserRolePermissionsManagamentPanelContextState,
  action: UserRolePermissionsManagamentPanelContextStateAction
): UserRolePermissionsManagamentPanelContextState {
  switch (action.type) {
    default:
      throw new Error('Action Not Allowed');
  }
}

/////////////
// Context //
/////////////

export const initialContextValue: UserRolePermissionsManagamentPanelContextValue =
  {
    save: async () => undefined,
  };

interface UserRolePermissionsManagamentPanelContextValue {
  save: () => Promise<void>;
}

const UserRolePermissionsManagamentPanelContext =
  createContext<UserRolePermissionsManagamentPanelContextValue>(
    initialContextValue
  );

export const UserRolePermissionsManagamentPanelProvider: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  useReducer(reducer, initialContextState);

  const handleSave = useCallback(async () => {
    enqueueSnackbar('Permisos actualizados exitosamente', {
      variant: 'success',
    });
  }, [enqueueSnackbar]);

  return (
    <UserRolePermissionsManagamentPanelContext.Provider
      value={{
        save: handleSave,
      }}
    >
      {children}
    </UserRolePermissionsManagamentPanelContext.Provider>
  );
};

export function useUserRolePermissionsManagamentPanel(): UserRolePermissionsManagamentPanelContextValue {
  return useContext(UserRolePermissionsManagamentPanelContext);
}

export default UserRolePermissionsManagamentPanelProvider;
