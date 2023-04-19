// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User;
  }
  interface User {
    name: string;
    email: string;
    image: string;
    accessToken: string;
  }
}
