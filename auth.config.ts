import Credentials from '@auth/core/providers/credentials';
import { defineConfig } from 'auth-astro';
import { verifyUser } from './src/lib/auth-utils';

export default defineConfig({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const user = await verifyUser(
            credentials.email as string, 
            credentials.password as string
          );
          return user;
        } catch (error: any) {
          // Re-throw the error to be handled by the login page
          throw new Error(error.message);
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  trustHost: true,
  secret: '0c4e1fb0e8c26492f82a0d6ba8a5b2b1f16d3c0b69f6bf42920c8f490b37833f',
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
