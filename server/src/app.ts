import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import './db/mongoose';
import { defaultRouter } from './routers/default.routes';
import { userRouter } from './routers/user.routes';
import { recipeRouter } from './routers/recipe.routes';
import { imagekitRouter } from './routers/imagekit.routes';
const cors = require('@koa/cors');

export const app = new Koa();

app
  .use(bodyParser())
  .use(cors())
  .use(userRouter.routes())
  .use(userRouter.allowedMethods())
  .use(recipeRouter.routes())
  .use(recipeRouter.allowedMethods())
  .use(imagekitRouter.routes())
  .use(imagekitRouter.allowedMethods())
  .use(defaultRouter.routes());
