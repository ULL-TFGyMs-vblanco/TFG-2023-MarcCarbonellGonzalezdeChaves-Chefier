import request from 'supertest';
import { app } from '../src/app';
import { describe, it, beforeAll } from '../../node_modules/vitest';
import { User } from '../src/models/user';

const server = app.listen();

beforeAll(async () => {
  await User.deleteMany();
});

describe('User router', (): void => {
  it('should register a new user', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({
        username: 'chefier',
        email: 'chefier@test.com',
        password: 'Password1',
      })
      .expect(200);
  });
  it('should log in the new user', async () => {
    await request(server)
      .post('/api/auth/login')
      .send({
        email: 'chefier@test.com',
        password: 'Password1',
      })
      .expect(200);
  });
});
