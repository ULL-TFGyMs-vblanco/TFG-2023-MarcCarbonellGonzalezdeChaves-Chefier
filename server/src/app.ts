import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import './db/mongoose';
import { defaultRouter } from './routers/default.routes';
import { userRouter } from './routers/user.routes';
import { recipeRouter } from './routers/recipe.routes';
import { koaSwagger } from 'koa2-swagger-ui';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('@koa/cors');

export const app = new Koa();

app
  .use(bodyParser())
  .use(cors())
  .use(userRouter.routes())
  .use(userRouter.allowedMethods())
  .use(recipeRouter.routes())
  .use(recipeRouter.allowedMethods())
  .use(
    koaSwagger({
      routePrefix: '/docs',
      swaggerOptions: {
        url: '/swagger.json',
      },
    })
  )
  .use(defaultRouter.routes())
  .use(defaultRouter.allowedMethods());
