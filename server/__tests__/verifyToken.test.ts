import request from 'supertest';
import { app } from '../src/app';
import { describe, it, beforeAll, vi } from 'vitest';
import { User } from '../src/models/user';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

const server = app.listen();

beforeAll(async () => {
  await User.deleteMany();
  const user = new User({
    username: 'user2',
    email: 'user2@test.com',
    password: 'Password1',
  });
  await User.create(user);
});

describe('Verify token middleware', (): void => {
  vi.spyOn(jwt, 'verify').mockImplementation((token: string) => {
    if (token === 'accessToken') {
      return {};
    } else {
      throw new Error('Not valid token');
    }
  });

  vi.spyOn(OAuth2Client.prototype, 'verifyIdToken').mockImplementation(
    async ({ idToken }) => {
      if (idToken === 'accessToken') {
        return {
          getPayload: () => {
            return {};
          },
        };
      } else {
        throw new Error('Not valid token');
      }
    }
  );

  vi.spyOn(axios, 'post').mockImplementation(async (url, body, options) => {
    if (options?.headers?.Authorization === 'Bearer accessToken') {
      return {
        status: 200,
      };
    } else {
      throw new Error('Not valid token');
    }
  });

  vi.mock('imagekit', async () => {
    return {
      default: vi.fn().mockImplementation(() => ({
        default: () => ({
          deleteFile: () => ({}),
        }),
      })),
    };
  });

  it('should return 401 if provider is not valid', async () => {
    await request(server)
      .post('/api/recipe')
      .set('Authorization', `Bearer accessToken`)
      .send({ provider: '1234' })
      .expect(401);
  });
  it('should return 401 if token is missing', async () => {
    await request(server)
      .post('/api/recipe')
      .send({ provider: 'credentials' })
      .expect(401);
  });
  describe('Credtentials', (): void => {
    it('should verify credentials access token', async () => {
      await request(server)
        .post('/api/recipe')
        .set('Authorization', `Bearer accessToken`)
        .send({ provider: 'credentials' })
        .expect(400);
    });
    it('should return 401 if credentials access token is not valid', async () => {
      await request(server)
        .post('/api/recipe')
        .set('Authorization', `Bearer 1234567890`)
        .send({ provider: 'credentials' })
        .expect(401);
    });
  });
  describe('Google', (): void => {
    it('should verify google access token', async () => {
      await request(server)
        .post('/api/recipe')
        .set('Authorization', `Bearer accessToken`)
        .send({ provider: 'google' })
        .expect(400);
    });
    it('should return 401 if google access token is not valid', async () => {
      await request(server)
        .post('/api/recipe')
        .set('Authorization', `Bearer 1234567890`)
        .send({ provider: 'google' })
        .expect(401);
    });
  });
  describe('Github', (): void => {
    it('should verify github access token', async () => {
      await request(server)
        .post('/api/recipe')
        .set('Authorization', `Bearer accessToken`)
        .send({ provider: 'github' })
        .expect(400);
    });
    it('should return 401 if github access token is not valid', async () => {
      await request(server)
        .post('/api/recipe')
        .set('Authorization', `Bearer 1234567890`)
        .send({ provider: 'github' })
        .expect(401);
    });
  });
});
