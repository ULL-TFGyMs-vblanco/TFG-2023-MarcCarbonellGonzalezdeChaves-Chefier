import axios from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

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
          const res = await axios.post('/api/auth/login', {
            email,
            password,
          });
          return res.data.user;
        } catch (err) {
          throw new Error('Invalid email or password');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        try {
          const res = await axios.post('/api/auth/register', {
            name: user.name,
            email: user.email,
            avatar: user.image,
          });
          return res.data.user;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          throw new Error(err.toString());
        }
      }
    },
  },
};

export default NextAuth(authOptions);
