import Router from 'koa-router';
import {
  getRecipe,
  getRecipes,
  postRecipe,
  updateRecipe,
  deleteRecipe,
} from '../services/recipe.api';
import { verifyToken } from '../middlewares/verifyToken';
import multer from 'koa-multer-esm';
const upload = multer();

export const recipeRouter = new Router();

// Route to get a recipe by id
recipeRouter.get('/api/recipe/:id', getRecipe);

// Route to get multiple recipes
recipeRouter.get('/api/recipes', getRecipes);

// Route to post a recipe
recipeRouter.post(
  '/api/recipe',
  upload.single('image'),
  verifyToken,
  postRecipe
);

// Route to update a recipe
recipeRouter.patch('/api/recipe/:id', verifyToken, updateRecipe);

// Route to delete a recipe
recipeRouter.delete('/api/recipe/:id', verifyToken, deleteRecipe);
