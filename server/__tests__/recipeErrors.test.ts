import request from 'supertest';
import { app } from '../src/app';
import { describe, it, beforeAll, vi } from 'vitest';
import { Recipe } from '../src/models/recipe';
import { User } from '../src/models/user';
import path from 'path';

const server = app.listen();

beforeAll(async () => {
  await Recipe.deleteMany();
  await User.deleteMany();
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

let accessToken = '';

describe('Recipe router', (): void => {
  vi.mock('../src/utils/APIUtils.ts', async () => {
    const mod: any = await vi.importActual('../src/utils/APIUtils.ts');
    return {
      default: {
        ...mod.default,
        uploadImage: () => {
          throw new Error('Error uploading image');
        },
        deleteImage: () => ({}),
      },
    };
  });

  describe('Post a recipe', () => {
    it('should register a test user', async () => {
      await request(server)
        .post('/api/auth/register')
        .send({
          username: 'tester2',
          email: 'tester2@test.com',
          password: 'Password1',
        })
        .expect(200);
    });
    it('should log in the test user', async () => {
      const res = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'tester2@test.com',
          password: 'Password1',
        })
        .expect(200);
      accessToken = res.body.accessToken;
    });
    it('should throw return status 500', async () => {
      await request(server)
        .post('/api/recipe')
        .attach(
          'image',
          path.resolve(__dirname, '../../public/images/chefier.png')
        )
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'multipart/form-data')
        .field('provider', 'credentials')
        .field('recipe', JSON.stringify(recipe))
        .expect(500);
    });
  });
});
