import { useUsersDialogs } from '@/features';

export type Dialogs = ReturnType<typeof useUsersDialogs>;

export function useDialogs(): Dialogs {
  const usersDialogs = useUsersDialogs();

  return {
    ...usersDialogs,
  };
}

export default useDialogs;
