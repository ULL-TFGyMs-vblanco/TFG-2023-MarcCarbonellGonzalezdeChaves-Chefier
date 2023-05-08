import request from 'supertest';
import { app } from '../src/app';
import { describe, it, beforeAll } from 'vitest';
import { Recipe } from '../src/models/recipe';
import { User } from '../src/models/user';
import path from 'path';

const server = app.listen();

beforeAll(async () => {
  await Recipe.deleteMany();
  await User.deleteMany();
});

const recipe = {
  name: 'Pizza con piña',
  user: {
    id: '123456789',
    name: 'elgranchef',
    image: 'https://www.google.com',
  },
  description: 'Una receta saludable y fácil de preparar para una cena ligera.',
  tags: {
    brekfast: false,
    lunch: true,
    dinner: true,
    dessert: false,
    snack: false,
    drink: false,
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

let accessToken = '';
let id = '';

describe('Recipe router', (): void => {
  describe('Get recipes', (): void => {
    it('should return all the recipes', async () => {
      await request(server).get('/api/recipes').expect(200);
    });
  });
  describe('Post a recipe', () => {
    it('should register a test user', async () => {
      await request(server)
        .post('/api/auth/register')
        .send({
          username: 'tester',
          email: 'tester@test.com',
          password: 'Password1',
        })
        .expect(200);
    });
    it('should log in the test user', async () => {
      const res = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'tester@test.com',
          password: 'Password1',
        })
        .expect(200);
      accessToken = res.body.accessToken;
    });
    it('should post a recipe', async () => {
      const res = await request(server)
        .post('/api/recipe')
        .attach(
          'image',
          path.resolve(__dirname, '../../public/images/chefier.png')
        )
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'multipart/form-data')
        .set('Provider', 'credentials')
        .field('recipe', JSON.stringify(recipe))
        .expect(200);
      id = res.body.recipe._id;
    });
    it('should delete a recipe', async () => {
      await request(server)
        .delete(`/api/recipe/${id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Provider', 'credentials')
        .expect(200);
    });
    it('should throw a validation error', async () => {
      await request(server)
        .post('/api/recipe')
        .attach(
          'image',
          path.resolve(__dirname, '../../public/images/chefier.png')
        )
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'multipart/form-data')
        .set('Provider', 'credentials')
        .field('recipe', JSON.stringify(recipe2))
        .expect(400);
    });
  });
});
