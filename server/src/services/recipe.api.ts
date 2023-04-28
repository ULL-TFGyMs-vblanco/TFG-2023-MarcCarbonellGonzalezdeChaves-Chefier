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
      request.file.buffer.toString('base64'),
      recipeData.name,
      `/images/posts/${recipeData.username}`
    );
    const fileId = res.fileId;
    recipeData.image = {
      url: res.url,
      fileId,
    };
    const recipe = new Recipe(recipeData);
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
        utils.deleteImage(fileId);
      });
  } catch (err) {
    utils.setResponse(response, 500, {
      error: { message: err },
      request: request.body,
    });
  }
};

// Delete a recipe
export const deleteRecipe = async ({ response, params }: Context) => {
  await Recipe.findByIdAndDelete(params.id)
    .then(async (recipe) => {
      try {
        await utils.deleteImage(recipe?.image.fileId as string);
        utils.setResponse(response, 200, { recipe });
      } catch (err) {
        utils.setResponse(response, 500, {
          error: { message: err },
          request: params.id,
        });
      }
    })
    .catch((err) => {
      utils.setResponse(response, 500, {
        error: { message: err },
        request: params.id,
      });
    });
};

module.exports = {
  getRecipes,
  postRecipe,
  deleteRecipe,
};
