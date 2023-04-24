import Router from 'koa-router';
import { getRecipes, postRecipe } from '../services/recipe.api';

export const recipeRouter = new Router();

recipeRouter.get('/api/recipes', async (ctx) => {
  await getRecipes(ctx, ctx.query);
});

recipeRouter.post('/api/recipe', postRecipe);
