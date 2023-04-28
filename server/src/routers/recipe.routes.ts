import Router from 'koa-router';
import { getRecipes, postRecipe, deleteRecipe } from '../services/recipe.api';
import { verifyToken } from '../middlewares/verifyToken';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require('fix-esm').require('@koa/multer');
const upload = multer();

export const recipeRouter = new Router();

recipeRouter.get('/api/recipes', async (ctx) => {
  await getRecipes(ctx, ctx.query);
});

recipeRouter.post(
  '/api/recipe',
  upload.single('image'),
  verifyToken,
  postRecipe
);

recipeRouter.delete('/api/recipe/:id', verifyToken, deleteRecipe);
