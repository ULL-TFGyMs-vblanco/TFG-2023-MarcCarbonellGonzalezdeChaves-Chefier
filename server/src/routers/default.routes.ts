import Router from 'koa-router';

export const defaultRouter = new Router();

// Default route
defaultRouter.all('(.*)', ctx => {
  ctx.response.status = 501;
});