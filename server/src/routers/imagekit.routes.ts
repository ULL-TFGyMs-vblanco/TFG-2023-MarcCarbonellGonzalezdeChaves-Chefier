import Router from 'koa-router';
import ImageKit from 'imagekit';

export const imagekitRouter = new Router();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT as string,
});

imagekitRouter.get('/api/imagekit/auth', async (ctx) => {
  const result = imagekit.getAuthenticationParameters();
  ctx.body = result;
});
