// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

// NextAuth module augmentation
declare module 'next-auth' {
  // Session object returned by getSession
  interface Session {
    user: User;
  }
  // Session user
  interface User {
    name: string;
    email: string;
    image: string;
    accessToken: string;
    provider: string;
  }
}
