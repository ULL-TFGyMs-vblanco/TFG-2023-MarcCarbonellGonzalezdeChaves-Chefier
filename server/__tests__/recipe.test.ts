import request from 'supertest';
import { app } from '../src/app';
import { describe, it, beforeAll, vi } from 'vitest';
import { Recipe } from '../src/models/recipe';
import { User } from '../src/models/user';

const server = app.listen();

beforeAll(async () => {
  await Recipe.deleteMany();
  await User.deleteMany();
  const user = new User({
    username: 'tester',
    email: 'tester@test.com',
    password: 'Password1',
  });
  await User.create(user);
});

const recipe = {
  name: 'Ensalada de quinoa y aguacate',
  username: 'chefjulia',
  image:
    'https://ik.imagekit.io/czvxqgafa/images/posts/ensalada_quinoa_aguacate.jpg',
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
  ingredients: [
    { name: 'quinoa', quantity: 1, unit: 'taza' },
    { name: 'aguacate', quantity: 2, unit: 'unidades' },
    { name: 'tomate cherry', quantity: 1, unit: 'taza' },
    { name: 'cebolla morada', quantity: 1, unit: 'unidad' },
    { name: 'pimiento rojo', quantity: 1, unit: 'unidad' },
    { name: 'limón', quantity: 1, unit: 'unidad' },
    { name: 'aceite de oliva', quantity: 2, unit: 'cucharadas' },
    { name: 'sal', quantity: 1, unit: 'pizca' },
    { name: 'pimienta negra', quantity: 1, unit: 'pizca' },
  ],
  instructions: [
    'Enjuagar la quinoa bajo agua fría y escurrir.',
    'Colocar la quinoa en una olla con dos tazas de agua y sal al gusto. Cocinar a fuego medio hasta que la quinoa esté cocida, aproximadamente 15 minutos.',
    'Mientras tanto, picar la cebolla, el pimiento y el tomate cherry. Cortar los aguacates en cubos y rociar con limón para evitar que se oxiden.',
    'Una vez cocida la quinoa, dejar enfriar.',
    'Mezclar la quinoa con los vegetales picados y el aceite de oliva.',
    'Agregar sal y pimienta al gusto.',
    'Servir frío y disfrutar!',
  ],
};

let accessToken = '';

describe('Recipe router', (): void => {
  vi.mock('imagekit-javascript', async () => {
    return {
      default: () => ({
        upload: () => ({
          url: '1234',
          fileId: '1234',
        }),
      }),
    };
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

  describe('Get recipes', (): void => {
    it('should return all the recipes', async () => {
      await request(server).get('/api/recipes').expect(200);
    });
  });
  describe('Post a recipe', () => {
    it('should log in the test user', async () => {
      const res = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'chefier@test.com',
          password: 'Password1',
        })
        .expect(200);
      accessToken = res.body.accessToken;
    });
    it('should post a recipe', async () => {
      await request(server)
        .post('/api/recipe')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ provider: 'credentials', recipe })
        .expect(200);
    });
    it('should throw a validation error for duplication', async () => {
      await request(server)
        .post('/api/recipe')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ provider: 'credentials' })
        .expect(400);
    });
  });
});
