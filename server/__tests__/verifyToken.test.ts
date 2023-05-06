import request from 'supertest';
import { app } from '../src/app';
import { describe, it, beforeAll, vi } from 'vitest';
import { User } from '../src/models/user';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import path from 'path';

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

const recipe = {
  name: 'Ensalada de quinoa y aguacate',
  username: 'chefjulia',
  description: 'Una receta saludable y fácil de preparar para una cena ligera.',
  tags: {
    brekfast: false,
    lunch: true,
    dinner: true,
    dessert: false,
    snack: false,
  },
  difficulty: 'Fácil',
  cookTime: 30,
  rations: 2,
  ingredients: [{ name: 'quinoa', quantity: 1, unit: 'taza' }],
  instructions: [{ step: 'Enjuagar la quinoa bajo agua fría y escurrir.' }],
};

const recipe2 = {
  name: 'Ensalada de quinoa y aguacate',
  username: 'chefjulia',
};

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

  vi.mock('axios', async () => {
    const mod: any = await vi.importActual('axios');
    return {
      default: {
        ...mod.default,
        post: async (url: string, body: any) => {
          if (body?.access_token !== 'accessToken') {
            throw new Error('Not valid token');
          }
        },
      },
    };
  });

  vi.mock('../src/utils/APIUtils.ts', async () => {
    const mod: any = await vi.importActual('../src/utils/APIUtils.ts');
    return {
      default: {
        ...mod.default,
        uploadImage: () => ({
          url: 'https://ik.imagekit.io/czvxqgafa/images/posts/ensalada_quinoa_aguacate.jpg',
          fileId: '1234',
        }),
        deleteImage: () => ({}),
      },
    };
  });

  it('should return 401 if provider is not valid', async () => {
    await request(server)
      .post('/api/recipe')
      .attach(
        'image',
        path.resolve(__dirname, '../../public/images/chefier.png')
      )
      .set('Authorization', `Bearer accessToken`)
      .set('Content-Type', 'multipart/form-data')
      .field('provider', '1234')
      .field('recipe', JSON.stringify(recipe))
      .expect(401);
  });
  it('should return 401 if token is missing', async () => {
    await request(server)
      .post('/api/recipe')
      .attach(
        'image',
        path.resolve(__dirname, '../../public/images/chefier.png')
      )
      .set('Content-Type', 'multipart/form-data')
      .field('provider', 'credentials')
      .field('recipe', JSON.stringify(recipe))
      .expect(401);
  });
  describe('Credtentials', (): void => {
    it('should verify credentials access token', async () => {
      await request(server)
        .post('/api/recipe')
        .attach(
          'image',
          path.resolve(__dirname, '../../public/images/chefier.png')
        )
        .set('Authorization', `Bearer accessToken`)
        .set('Content-Type', 'multipart/form-data')
        .field('provider', 'credentials')
        .field('recipe', JSON.stringify(recipe2))
        .expect(400);
    });
    it('should return 401 if credentials access token is not valid', async () => {
      await request(server)
        .post('/api/recipe')
        .attach(
          'image',
          path.resolve(__dirname, '../../public/images/chefier.png')
        )
        .set('Authorization', `Bearer 1234567890`)
        .set('Content-Type', 'multipart/form-data')
        .field('provider', 'credentials')
        .field('recipe', JSON.stringify(recipe2))
        .expect(401);
    });
  });
  describe('Google', (): void => {
    it('should verify google access token', async () => {
      await request(server)
        .post('/api/recipe')
        .attach(
          'image',
          path.resolve(__dirname, '../../public/images/chefier.png')
        )
        .set('Authorization', `Bearer accessToken`)
        .set('Content-Type', 'multipart/form-data')
        .field('provider', 'google')
        .field('recipe', JSON.stringify(recipe2))
        .expect(400);
    });
    it('should return 401 if google access token is not valid', async () => {
      await request(server)
        .post('/api/recipe')
        .attach(
          'image',
          path.resolve(__dirname, '../../public/images/chefier.png')
        )
        .set('Authorization', `Bearer 1234567890`)
        .set('Content-Type', 'multipart/form-data')
        .field('provider', 'google')
        .field('recipe', JSON.stringify(recipe2))
        .expect(401);
    });
  });
  describe('Github', (): void => {
    it('should verify github access token', async () => {
      await request(server)
        .post('/api/recipe')
        .attach(
          'image',
          path.resolve(__dirname, '../../public/images/chefier.png')
        )
        .set('Authorization', 'Bearer accessToken')
        .set('Content-Type', 'multipart/form-data')
        .field('provider', 'github')
        .field('recipe', JSON.stringify(recipe2))
        .expect(400);
    });
    it('should return 401 if github access token is not valid', async () => {
      await request(server)
        .post('/api/recipe')
        .attach(
          'image',
          path.resolve(__dirname, '../../public/images/chefier.png')
        )
        .set('Authorization', 'Bearer 1234567890')
        .set('Content-Type', 'multipart/form-data')
        .field('provider', 'github')
        .field('recipe', JSON.stringify(recipe2))
        .expect(401);
    });
  });
});
