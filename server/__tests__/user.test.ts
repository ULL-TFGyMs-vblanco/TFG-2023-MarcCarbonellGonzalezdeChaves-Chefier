import request from 'supertest';
import { app } from '../src/app';
import { describe, it, beforeAll } from '../../node_modules/vitest';
import { User } from '../src/models/user';

const server = app.listen();

beforeAll(async () => {
  await User.deleteMany();
});

// let accessToken = '';

describe('User router', (): void => {
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
      await request(server)
        .post('/api/auth/register')
        .send({
          username: 'InvalidUsername',
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
      const res = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'chefier@test.com',
          password: 'Password1',
        })
        .expect(200);
      // accessToken = res.body.accessToken;
    });
    it('should return 404 if email or password is incorrect', async () => {
      await request(server)
        .post('/api/auth/login')
        .send({
          email: 'incorrectEmail@test.com',
          password: 'incorrectPassword',
        })
        .expect(404);
    });
  });
  describe('Get user', (): void => {
    it('should return 404 if user is not found', async () => {
      await request(server)
        .get('/api/username/5f7b2c1e3e3c3c1b8c7f8c2f')
        // .set('Authorization', `Bearer ${accessToken}`)
        .send({ provider: 'credentials' })
        .expect(404);
    });
    it('should return the specified user', async () => {
      await request(server)
        .get('/api/username/chefier')
        // .set('Authorization', `Bearer ${accessToken}`)
        .send({ provider: 'credentials' })
        .expect(200);
    });
  });
});
