import Router from 'koa-router';
import { getUser, register, login, updateUser } from '../services/user.api';
import { verifyToken } from '../middlewares/verifyToken';

export const userRouter = new Router();

// Route to get a user by username
userRouter.get('/api/username/:username', async (ctx) => {
  await getUser(ctx, { username: ctx.params.username });
});

// Route to get a user by email
userRouter.get('/api/email/:email', async (ctx) => {
  await getUser(ctx, { email: ctx.params.email });
});

// Route to register a new user
userRouter.post('/api/auth/register', register);

// Route to login a user
userRouter.post('/api/auth/login', login);

// Route to update a user
userRouter.patch('/api/user/:id', verifyToken, async (ctx) => {
  await updateUser(ctx);
});

// Route to update multiple users
userRouter.patch('/api/users', verifyToken, async (ctx) => {
  await updateUser(ctx, { multiple: true });
});
