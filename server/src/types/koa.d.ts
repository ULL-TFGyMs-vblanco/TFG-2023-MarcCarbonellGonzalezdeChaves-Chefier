import Koa from 'koa';

declare module 'koa' {
  interface Context {
    request: {
      email: string;
      password: string;
    } & Koa.Context['request'];
  }
}
