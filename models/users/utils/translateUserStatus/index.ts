import { UserStatus } from '../../types';

export function translateUserStatus(status: UserStatus): string {
  const translations: Record<UserStatus, string> = {
    ENABLED: 'Habilitado',
    DISABLED: 'Deshabilitado',
  };

  return translations[status] || 'Sin definir';
}

export default translateUserStatus;
