import { withAuth } from 'next-auth/middleware';

import { PAGES } from '@/config';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      if (!token || !token.user.role) return false;

      if (token.user.status === 'DISABLED') return false;

      // Change this line to specify the roles those are not allowed to access
      return ['administrator'].includes(token.user.role.type);
    },
  },
  pages: {
    signIn: PAGES.SIGN_IN,
    error: PAGES.SIGN_IN,
  },
});

export const config = { matcher: '/admin/:path*' };
