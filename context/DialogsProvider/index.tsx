import { UsersDialogsProvider } from '@/features';

export const DialogsProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => <UsersDialogsProvider>{children}</UsersDialogsProvider>;

export default DialogsProvider;

////////////////
// Re-exports //
////////////////

export { useDialogs, useDialogHandler } from './hooks';
export type { Dialog } from './types';
