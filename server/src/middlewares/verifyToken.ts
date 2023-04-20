import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { Context, Next, Request, Response } from 'koa';
import utils from '../utils/APIUtils';

export const verifyToken = async (
  { response, request }: Context,
  next: Next
) => {
  if (
    request.body.provider !== 'credentials' &&
    request.body.provider !== 'google' &&
    request.body.provider !== 'github'
  ) {
    utils.setResponse(response, 401, {
      error: 'Invalid provider',
      request: request.body,
    });
  } else {
    const bearerHeader = request.headers.authorization;
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1];
      if (request.body.provider === 'credentials') {
        verifyCredentials(token, next, request, response);
      } else if (request.body.provider === 'google') {
        verifyGoogle(token, next, request, response);
      } else {
        verifyGithub(token, next, request, response);
      }
    } else {
      utils.setResponse(response, 401, {
        error: 'An access token must be provided',
        request: request.body,
      });
    }
  }
};

function verifyCredentials(
  token: string,
  next: Next,
  request: Request,
  response: Response
) {
  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return next();
  } catch (error: any) {
    utils.setResponse(response, 401, {
      error,
      request: request.body,
    });
    return;
  }
}

async function verifyGoogle(
  token: string,
  next: Next,
  request: Request,
  response: Response
) {
  const client = new OAuth2Client(process.env.CLIENT_ID);
  await client
    .verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    })
    .then(() => {
      return next();
    })
    .catch((error) => {
      utils.setResponse(response, 401, { error, request: request.body });
    });
}

async function verifyGithub(
  token: string,
  next: Next,
  request: Request,
  response: Response
) {
  await axios
    .post(
      `https://api.github.com/aplications/${process.env.GITHUB_CLIENT_ID}/token`,
      {
        access_token: token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        return next();
      } else {
        utils.setResponse(response, 500, {
          error: res,
          request: request.body,
        });
        return;
      }
    })
    .catch((error) => {
      utils.setResponse(response, 401, { error, request: request.body });
    });
}
