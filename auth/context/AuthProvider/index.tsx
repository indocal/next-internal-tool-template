import { useContext, createContext } from 'react';

import { useDialogHandler, Dialog } from '@/context';

import { RestorePasswordDialog, ChangePasswordDialog } from '../../components';

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

export const initialContextValue: AuthDialogsContextValue = {
  restorePasswordDialog: initializeDialog(),
  changePasswordDialog: initializeDialog(),
};

export interface AuthDialogsContextValue {
  restorePasswordDialog: Dialog;
  changePasswordDialog: Dialog;
}

const AuthDialogsContext =
  createContext<AuthDialogsContextValue>(initialContextValue);

export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const restorePasswordDialogHandler = useDialogHandler();
  const changePasswordDialogHandler = useDialogHandler();

  return (
    <AuthDialogsContext.Provider
      value={{
        restorePasswordDialog: restorePasswordDialogHandler,
        changePasswordDialog: changePasswordDialogHandler,
      }}
    >
      {restorePasswordDialogHandler.isOpen && <RestorePasswordDialog />}
      {changePasswordDialogHandler.isOpen && <ChangePasswordDialog />}

      {children}
    </AuthDialogsContext.Provider>
  );
};

export function useAuthDialogs(): AuthDialogsContextValue {
  return useContext(AuthDialogsContext);
}

export default AuthProvider;
