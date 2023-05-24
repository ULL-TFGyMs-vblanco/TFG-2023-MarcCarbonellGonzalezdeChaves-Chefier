export { default } from 'next-auth/middleware';

// NextAuth middleware configuration
export const config = {
  matcher: ['/recipe/new'],
};
