import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { defaultRouter } from './routers/default.routes';

export const app = new Koa();

app.use(bodyParser());

app.use(defaultRouter.routes());