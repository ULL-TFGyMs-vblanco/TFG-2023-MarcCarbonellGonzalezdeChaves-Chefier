import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import './db/mongoose';
import { defaultRouter } from './routers/default.routes';
import { userRouter } from './routers/user.routes';
import cors from '@koa/cors';

export const app = new Koa();

app
  .use(bodyParser())
  .use(cors())
  .use(userRouter.routes())
  .use(userRouter.allowedMethods())
  .use(defaultRouter.routes());
