import { useContext, createContext } from 'react';

import { useDialogHandler, Dialog } from '@/context';

import {
  AddUserDialog,
  EditUserDialog,
  AddUserRoleDialog,
  EditUserRoleDialog,
} from '../../components';

/////////////
// Context //
/////////////

function initializeDialog(): Dialog {
  return {
    isOpen: false,
    open: () => undefined,
    close: () => undefined,
  };
}

export const initialContextValue: UsersDialogsContextValue = {
  addUserDialog: initializeDialog(),
  editUserDialog: initializeDialog(),
  addUserRoleDialog: initializeDialog(),
  editUserRoleDialog: initializeDialog(),
};

export interface UsersDialogsContextValue {
  addUserDialog: Dialog;
  editUserDialog: Dialog;
  addUserRoleDialog: Dialog;
  editUserRoleDialog: Dialog;
}

const UsersDialogsContext =
  createContext<UsersDialogsContextValue>(initialContextValue);

export const UsersDialogsProvider: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const addUserDialogHandler = useDialogHandler();
  const editUserDialogHandler = useDialogHandler();

  const addUserRoleDialogHandler = useDialogHandler();
  const editUserRoleDialogHandler = useDialogHandler();

  return (
    <UsersDialogsContext.Provider
      value={{
        addUserDialog: addUserDialogHandler,
        editUserDialog: editUserDialogHandler,
        addUserRoleDialog: addUserRoleDialogHandler,
        editUserRoleDialog: editUserRoleDialogHandler,
      }}
    >
      {addUserDialogHandler.isOpen && <AddUserDialog />}
      {editUserDialogHandler.isOpen && <EditUserDialog />}

      {addUserRoleDialogHandler.isOpen && <AddUserRoleDialog />}
      {editUserRoleDialogHandler.isOpen && <EditUserRoleDialog />}

      {children}
    </UsersDialogsContext.Provider>
  );
};

export function useUsersDialogs(): UsersDialogsContextValue {
  return useContext(UsersDialogsContext);
}

export default UsersDialogsProvider;
