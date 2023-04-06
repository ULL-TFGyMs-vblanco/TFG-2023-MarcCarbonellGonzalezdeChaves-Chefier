import Router from 'koa-router';
import { getUser, register, login } from '../services/user.api';
import { verifyToken } from '../middlewares/verifyToken';

export const userRouter = new Router();

userRouter.get('/api/users/:username', verifyToken, getUser);

userRouter.post('/api/users/register', register);

userRouter.post('/api/users/login', login);
