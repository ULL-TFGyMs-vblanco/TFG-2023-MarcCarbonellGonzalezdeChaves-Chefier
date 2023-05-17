import Router from 'koa-router';
const swagger = require('../../swagger.json');

export const defaultRouter = new Router();

defaultRouter.get('/swagger.json', (ctx) => {
  ctx.response.body = swagger;
});

// Default route
defaultRouter.all('(.*)', (ctx) => {
  ctx.response.status = 501;
});
