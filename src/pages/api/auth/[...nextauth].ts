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
  ],
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
