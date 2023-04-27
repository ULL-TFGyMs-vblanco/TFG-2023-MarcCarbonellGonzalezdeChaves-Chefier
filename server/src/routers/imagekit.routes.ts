import Router from 'koa-router';
import ImageKit from 'imagekit';

export const imagekitRouter = new Router();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT || '',
});

imagekitRouter.get('/api/imagekit/auth', async (ctx) => {
  const result = imagekit.getAuthenticationParameters();
  ctx.body = result;
});
