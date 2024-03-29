import axios from '../../../../axios_config';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import UserService from '@/services/UserService';

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const res = await axios.post('/auth/login', {
            email,
            password,
          });
          return res.data;
        } catch (err: any) {
          throw new Error(err.response.data.error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        try {
          await UserService.register('/auth/register', {
            email: user.email,
            username: user.name,
            image: user.image,
          });
        } catch (err: any) {
          const error = err.toString();
          if (!error.match(/^Error: Duplicated credential/)) return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account) {
        if (account.provider === 'credentials') {
          token.accessToken = user?.accessToken;
        } else if (account.provider === 'github') {
          token.accessToken = account.access_token;
        } else if (account.provider === 'google') {
          token.accessToken = account.id_token;
        }
        token.provider = account.provider;
      }
      return token;
    },
    async session({ token, session }) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { accessToken, ...user } = session.user;
      session.user = {
        ...user,
        accessToken: token.accessToken as string,
        provider: token.provider as string,
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
