import { DefaultJWT } from 'next-auth/jwt';

import { User as UserModel } from '@/models';

declare module 'next-auth' {
  type Session = {
    user: User;
    expires: string;
  };

  type User = UserModel;
}

declare module 'next-auth/jwt' {
  type JWT = DefaultJWT & {
    user: UserModel;
  };
}
