import { Context } from 'koa';
import Router from 'koa-router';
import { register, login } from '../services/user.api';

export const userRouter = new Router();

userRouter.post('/api/auth/register', async (ctx: Context) => {
  await register(ctx);
});

userRouter.post('/api/auth/login', async (ctx: Context) => {
  await login(ctx);
});
