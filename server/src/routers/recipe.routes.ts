import Router from 'koa-router';
import { getRecipes, postRecipe } from '../services/recipe.api';
import { verifyToken } from '../middlewares/verifyToken';
const multer = require('@koa/multer');
const upload = multer();

export const recipeRouter = new Router();

recipeRouter.get('/api/recipes', async (ctx) => {
  await getRecipes(ctx, ctx.query);
});

recipeRouter.post('/api/recipe', upload('image'), verifyToken, postRecipe);
