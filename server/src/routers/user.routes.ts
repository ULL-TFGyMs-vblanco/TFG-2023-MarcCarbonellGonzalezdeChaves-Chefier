import Router from 'koa-router';
import { getUser, register, login } from '../services/user.api';

export const userRouter = new Router();

userRouter.get('/api/users/:username', getUser);

userRouter.post('/api/auth/register', register);

userRouter.post('/api/auth/login', login);
