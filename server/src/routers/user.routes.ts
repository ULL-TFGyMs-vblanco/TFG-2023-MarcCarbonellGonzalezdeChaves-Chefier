import Router from 'koa-router';
import { getUser, register, login, updateUser } from '../services/user.api';
import { verifyToken } from '../middlewares/verifyToken';

export const userRouter = new Router();

userRouter.get('/api/username/:username', async (ctx) => {
  await getUser(ctx, { username: ctx.params.username });
});

userRouter.get('/api/email/:email', async (ctx) => {
  await getUser(ctx, { email: ctx.params.email });
});

userRouter.post('/api/auth/register', register);

userRouter.post('/api/auth/login', login);

userRouter.patch('/api/user/:id', verifyToken, updateUser);
