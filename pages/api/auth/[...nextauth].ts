import { NextApiHandler } from 'next';
import NextAuth, { User, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/lib';
import {
  DisabledUserError,
  InvalidCredentialsError,
  ForbiddenError,
} from '@/auth';
import { withErrorHandler } from '@/utils';
import { PAGES } from '@/config';

// TODO: Add withAuthHanlder() to all pages
// TODO: add /me endpoint

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Identifier', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: credentials?.identifier },
              { email: credentials?.identifier },
            ],
            password: credentials?.password,
          },
          select: {
            id: true,
            username: true,
            email: true,
            fullName: true,
            status: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        if (!user) throw new InvalidCredentialsError();

        if (user.status === 'DISABLED') throw new DisabledUserError();

        if (req.body?.callbackUrl) {
          const callbackUrl = decodeURIComponent(req.body.callbackUrl);

          const { searchParams } = new URL(callbackUrl);

          const isAdminPage = searchParams
            .get('callbackUrl')
            ?.startsWith(PAGES.ADMIN_ROOT);

          if (isAdminPage) {
            // Change this line to specify the roles those are not allowed to access
            const hasValidRole =
              user.role && ['administrator'].includes(user.role.type);

            if (!hasValidRole) throw new ForbiddenError();
          }
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as unknown as User;

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;

      return session;
    },
  },
  pages: {
    signIn: PAGES.SIGN_IN,
    error: PAGES.SIGN_IN,
  },
};

const handler: NextApiHandler = async (req, res) =>
  await NextAuth(req, res, authOptions);

export default withErrorHandler(handler);
