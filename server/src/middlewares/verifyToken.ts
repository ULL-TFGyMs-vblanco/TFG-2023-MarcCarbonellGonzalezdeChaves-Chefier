import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import ctx from '../utils/CtxUtils';

export const verifyToken = async (
  { response, request }: Context,
  next: Next
) => {
  if (
    request.body.provider !== 'credentials' &&
    request.body.provider !== 'google' &&
    request.body.provider !== 'github'
  ) {
    ctx.setResponse(response, 401, {
      error: 'Invalid provider',
      request: request.body,
    });
  } else {
    const bearerHeader = request.headers.authorization;
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1];
      if (request.body.provider === 'credentials') {
        try {
          jwt.verify(token, process.env.JWT_SECRET as string);
          return next();
        } catch (error: any) {
          ctx.setResponse(response, 401, {
            error,
            request: request.body,
          });
        }
      } else if (request.body.provider === 'google') {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        try {
          await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
          });
          return next();
        } catch (error: any) {
          ctx.setResponse(response, 401, { error, request: request.body });
        }
      } else {
        try {
          const res = await axios.post(
            `https://api.github.com/aplications/${process.env.GITHUB_CLIENT_ID}/token`,
            {
              access_token: token,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.status === 200) {
            return next();
          } else {
            ctx.setResponse(response, 500, {
              error: res,
              request: request.body,
            });
          }
        } catch (error: any) {
          ctx.setResponse(response, 401, { error, request: request.body });
        }
      }
    } else {
      ctx.setResponse(response, 401, {
        error: 'An access token must be provided',
        request: request.body,
      });
    }
  }
};
