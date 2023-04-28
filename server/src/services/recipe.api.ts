import { Context } from 'koa';
import { Recipe } from '../models/recipe';
import utils from '../utils/APIUtils';

// Get recipes list
export const getRecipes = async (
  { response, request }: Context,
  filter: any
) => {
  await Recipe.find(filter)
    .then((recipes) => {
      utils.setResponse(response, 200, recipes);
    })
    .catch((err) => {
      utils.setResponse(response, 500, {
        error: err,
        requerequest: request.body,
      });
    });
};

// Post a recipe
export const postRecipe = async ({ response, request }: Context) => {
  try {
    const recipeData = JSON.parse(request.body.recipe);
    const res = await utils.uploadImage(
      request.file,
      recipeData.name,
      `/images/posts/${request.body.recipe.username}}`
    );
    request.body.recipe.image = res.url;
    const fileID = res.fileId;
    const recipe = new Recipe(request.body.recipe);
    await Recipe.create(recipe)
      .then((recipe) => {
        utils.setResponse(response, 200, { recipe });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          const errors = Object.keys(err.errors).map((key) => {
            return { message: err.errors[key].message, field: key };
          });
          utils.setResponse(response, 400, {
            error: { message: err._message, errors: errors },
            request: request.body,
          });
        } else {
          utils.setResponse(response, 500, {
            error: { message: err },
            request: request.body,
          });
        }
        utils.deleteImage(fileID);
      });
  } catch (err) {
    utils.setResponse(response, 500, {
      error: { message: 'Error uploading post image' },
      request: request.body,
    });
  }
};

module.exports = {
  getRecipes,
  postRecipe,
};
