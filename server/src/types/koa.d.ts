import Koa from 'koa';

// Koa module augmentation
declare module 'koa' {
  // Context object
  interface Context {
    request: {
      email: string;
      password: string;
    } & Koa.Context['request'];
  }
}
