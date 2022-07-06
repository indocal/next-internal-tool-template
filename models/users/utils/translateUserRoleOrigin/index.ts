import { UserRoleOrigin } from '../../types';

export function translateUserRoleOrigin(status: UserRoleOrigin): string {
  const translations: Record<UserRoleOrigin, string> = {
    SYSTEM: 'Sistema',
    USER: 'Usuario',
  };

  return translations[status] || 'Sin definir';
}

export default translateUserRoleOrigin;
