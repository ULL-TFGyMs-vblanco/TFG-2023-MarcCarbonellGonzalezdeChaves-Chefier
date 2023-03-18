import axios from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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

        const res = await axios.post('/api/auth/login', {
          email,
          password,
        });

        if (res.status === 401) {
          throw new Error('Invalid email or password');
        } else if (res.status === 200) {
          return res.data.user;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
};

export default NextAuth(authOptions);
