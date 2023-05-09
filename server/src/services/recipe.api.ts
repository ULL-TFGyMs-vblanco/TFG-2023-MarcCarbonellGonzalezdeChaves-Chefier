import { Context } from 'koa';
import { Recipe } from '../models/recipe';
import utils from '../utils/APIUtils';

// Get recipes by id
export const getRecipe = async ({ response, request, params }: Context) => {
  await Recipe.findById(params.id)
    .then((recipe) => {
      if (!recipe) {
        utils.setResponse(response, 404, {
          error: { message: 'Recipe not found' },
          request,
        });
      } else {
        utils.setResponse(response, 200, recipe);
      }
    })
    .catch((err) => {
      utils.setResponse(response, 500, {
        error: { message: 'Error finding the recipe', error: err },
        requerequest: request.body,
      });
    });
};

// Get recipes list
export const getRecipes = async ({ response, request, query }: Context) => {
  if (!query.page) {
    utils.setResponse(response, 400, {
      error: { message: 'A page index must be provided' },
      request: request.body,
    });
    return;
  } else if (isNaN(Number(query.page))) {
    utils.setResponse(response, 400, {
      error: { message: 'Page index must be a number' },
      request: request.body,
    });
    return;
  } else if (Number(query.page) < 1) {
    utils.setResponse(response, 400, {
      error: { message: 'Page index must be greater than 0' },
      request: request.body,
    });
    return;
  }
  const { page, ...filters } = query;
  const pageIndex = Number(page);
  await Recipe.find(filters)
    .then((recipes) => {
      utils.setResponse(response, 200, {
        list: recipes.slice((pageIndex - 1) * 25, pageIndex * 25),
        totalPages: Math.ceil(recipes.length / 25),
      });
    })
    .catch((err) => {
      utils.setResponse(response, 500, {
        error: { message: 'Error finding recipes', error: err },
        requerequest: request.body,
      });
    });
};

// Post a recipe
export const postRecipe = async ({ response, request }: Context) => {
  try {
    const recipeData = JSON.parse(request.body.recipe);
    if (!recipeData.name || !recipeData.user) {
      utils.setResponse(response, 400, {
        error: { message: 'Recipe name and user name are required' },
        request: request.body,
      });
      return;
    } else if (recipeData.user && !recipeData.user.name) {
      utils.setResponse(response, 400, {
        error: { message: 'Recipe user name is required' },
        request: request.body,
      });
      return;
    }
    const res = await utils.uploadImage(
      request.file.buffer.toString('base64'),
      recipeData.name,
      `/images/posts/${recipeData.user.name}`
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
      .catch(async (err) => {
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
            error: { message: 'Error creating the new recipe', error: err },
            request: request.body,
          });
        }
        await utils.deleteImage(fileId);
      });
  } catch (err) {
    utils.setResponse(response, 500, {
      error: { message: 'Error uploading recipe image', error: err },
      request: request.body,
    });
  }
};

// Update a recipe
export const updateRecipe = async ({ response, request, params }: Context) => {
  const allowedUpdates = ['likes', 'saved', 'valorations'];
  const actualUpdates = Object.keys(request.body.update);
  const isValidUpdate = actualUpdates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    utils.setResponse(response, 400, {
      error: { message: 'Update is not permitted' },
      request: request.body,
    });
  } else {
    if (!params.id) {
      utils.setResponse(response, 400, {
        error: { message: 'An id must be provided' },
        request: request.body,
      });
    } else {
      try {
        const element = await Recipe.findByIdAndUpdate(
          params.id,
          request.body.update,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!element) {
          utils.setResponse(response, 404, {
            error: { message: 'Recipe not found' },
            request: request.body,
          });
        } else {
          utils.setResponse(response, 200, element);
        }
      } catch (err) {
        utils.setResponse(response, 500, {
          error: { message: JSON.stringify(err), error: err },
          request: request.body,
        });
      }
    }
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
        error: { message: 'Error deleting the recipe', error: err },
        request: params.id,
      });
    });
};

module.exports = {
  getRecipe,
  getRecipes,
  postRecipe,
  updateRecipe,
  deleteRecipe,
};
