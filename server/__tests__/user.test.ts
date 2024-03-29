import request from 'supertest';
import { app } from '../src/app';
import { describe, it, beforeAll, vi } from 'vitest';
import { User } from '../src/models/user';

const server = app.listen();

beforeAll(async () => {
  await User.deleteMany();
});

describe('User router', (): void => {
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
    it('should return 400 if username or email is missing', async () => {
      await request(server)
        .post('/api/auth/register')
        .send({
          password: 'Password1',
        })
        .expect(400);
    });
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
    it('should register a new user with a username with more than 20 characters', async () => {
      await request(server)
        .post('/api/auth/register')
        .send({
          username: 'chefier12345678909878',
          email: 'chefier12345678909878@test.com',
          image: 'https://i.imgur.com/4YKtXQ8.jpg',
        })
        .expect(200);
    });
    it('should register a new user with a username porvided by the server', async () => {
      await request(server)
        .post('/api/auth/register')
        .send({
          username: 'chefier',
          email: 'chefierEmail@test.com',
          image: 'https://i.imgur.com/4YKtXQ8.jpg',
        })
        .expect(200);
    });
    it('should register a new user without password', async () => {
      await request(server)
        .post('/api/auth/register')
        .send({
          username: 'chefier2',
          email: 'chefier2@test.com',
          image: 'https://i.imgur.com/4YKtXQ8.jpg',
        })
        .expect(200);
    });
    it('should return 400 if username is not valid', async () => {
      await request(server)
        .post('/api/auth/register')
        .send({
          username: 'thisIsAnInvalidUsername',
          email: 'chefier@test.com',
          password: 'Password1',
        })
        .expect(400);
    });
    it('should return 400 if email is not valid', async () => {
      await request(server)
        .post('/api/auth/register')
        .send({
          username: 'chefier',
          email: 'invalidEmail',
          password: 'Password1',
        })
        .expect(400);
    });
    it('should return 400 if password is not valid', async () => {
      await request(server)
        .post('/api/auth/register')
        .send({
          username: 'chefier',
          email: 'chefier@test.com',
          password: 'invalidPassword',
        })
        .expect(400);
    });
    it('should return 400 if username or email is already in use', async () => {
      await request(server)
        .post('/api/auth/register')
        .send({
          username: 'chefier',
          email: 'chefier@test.com',
          password: 'Password1',
        })
        .expect(400);
    });
  });
  describe('Login', (): void => {
    it('should return 400 if email or password is missing', async () => {
      await request(server)
        .post('/api/auth/login')
        .send({
          email: 'chefier@test.com',
        })
        .expect(400);
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
    it('should return 404 if email or password is incorrect', async () => {
      await request(server)
        .post('/api/auth/login')
        .send({
          email: 'incorrectEmail@test.com',
          password: 'incorrectPassword',
        })
        .expect(400);
    });
  });
  describe('Get user', (): void => {
    it('should return 404 if user is not found', async () => {
      await request(server)
        .get('/api/username/5f7b2c1e3e3c3c1b8c7f8c2f')
        .send({ provider: 'credentials' })
        .expect(404);
    });
    it('should return the specified user by username', async () => {
      await request(server)
        .get('/api/username/chefier')
        .send({ provider: 'credentials' })
        .expect(200);
    });
    it('should return the specified user by email', async () => {
      await request(server)
        .get('/api/email/chefier@test.com')
        .send({ provider: 'credentials' })
        .expect(200);
    });
  });
});
