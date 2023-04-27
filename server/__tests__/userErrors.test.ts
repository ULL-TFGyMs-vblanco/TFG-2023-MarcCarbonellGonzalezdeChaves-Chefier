import request from 'supertest';
import { app } from '../src/app';
import { describe, it, beforeAll } from '../../node_modules/vitest';
import { User } from '../src/models/user';
import { vi } from 'vitest';
import * as jwt from 'jsonwebtoken';

const server = app.listen();

beforeAll(async () => {
  await User.deleteMany();
});

const accessToken = jwt.sign({ id: '1234' }, process.env.JWT_SECRET as string, {
  expiresIn: '1h',
});

describe('User router server errors', (): void => {
  vi.spyOn(User, 'create').mockImplementation(() => {
    throw new Error('Error');
  });

  vi.spyOn(User, 'findOne').mockImplementation(() => {
    throw new Error('Error');
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

  describe('Register', (): void => {
    it('should return 500 if an error occurs when triying to register a user', async () => {
      await request(server)
        .post('/api/auth/register')
        .send({
          username: 'user',
          email: 'user@test.com',
          password: 'Password1',
        })
        .expect(500);
    });
  });
  describe('Login', (): void => {
    it('should return 500 if an error occurs when the user tries to log in', async () => {
      await request(server)
        .post('/api/auth/login')
        .send({
          email: 'user@test.com',
          password: 'Password1',
        })
        .expect(500);
    });
  });
  describe('Get user', (): void => {
    it('should return the specified user', async () => {
      await request(server)
        .get('/api/username/user')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ provider: 'credentials' })
        .expect(500);
    });
  });
});
