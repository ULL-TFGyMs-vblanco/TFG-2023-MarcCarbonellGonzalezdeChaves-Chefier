import { Context } from 'koa';
import { Recipe, RecipeDocumentInterface } from '../models/recipe';
import APIUtils from '../utils/APIUtils';
import RecipeUtils from '../utils/RecipeUtils';
import { User } from '../models/user';

// Get recipes by id
export const getRecipe = async ({ response, request, params }: Context) => {
  await Recipe.findById(params.id)
    .then((recipe) => {
      if (!recipe) {
        APIUtils.setResponse(response, 404, {
          error: { message: 'Recipe not found' },
          request,
        });
      } else {
        APIUtils.setResponse(response, 200, recipe);
      }
    })
    .catch((err) => {
      APIUtils.setResponse(response, 500, {
        error: { message: 'Error finding the recipe', error: err },
        requerequest: request.body,
      });
    });
};

// Get recipes list
export const getRecipes = async ({ response, request, query }: Context) => {
  if (!query.page) {
    APIUtils.setResponse(response, 400, {
      error: { message: 'A page index must be provided' },
      request: request.body,
    });
    return;
  } else if (isNaN(Number(query.page))) {
    APIUtils.setResponse(response, 400, {
      error: { message: 'Page index must be a number' },
      request: request.body,
    });
    return;
  } else if (Number(query.page) < 1) {
    APIUtils.setResponse(response, 400, {
      error: { message: 'Page index must be greater than 0' },
      request: request.body,
    });
    return;
  }
  const { page, search, ...filters } = query;
  const pageIndex = Number(page);

  const aggregate: object[] = [];
  if (typeof search === 'string') {
    const $search = RecipeUtils.getAggregateSearch(search);
    aggregate.push({ $search });
  }
  if (Object.keys(filters).length > 0) {
    const $match = RecipeUtils.getAggregateMatch(filters);
    if (typeof filters.following === 'string') {
      const user = await User.findById(filters.following);
      let filterObject = {};
      filterObject = RecipeUtils.getAggregateFollowing(user);
      $match.$and.push(filterObject);
    }
    if ($match.$and.length > 0) aggregate.push({ $match });
  }

  try {
    let recipes: RecipeDocumentInterface[] = [];

    if (aggregate.length === 0) {
      recipes = await Recipe.find().sort({ date: -1 });
    } else {
      if (typeof search === 'string') {
        recipes = await Recipe.aggregate(aggregate);
      } else {
        recipes = await Recipe.aggregate(aggregate).sort({ date: -1 });
      }
    }

    const [minRating, maxRating] = RecipeUtils.getMinAndMaxRating(recipes);
    const [minTime, maxTime] = RecipeUtils.getMinAndMaxTime(recipes);
    APIUtils.setResponse(response, 200, {
      list: recipes.slice((pageIndex - 1) * 1, pageIndex * 1),
      totalPages: Math.ceil(recipes.length / 1),
      metadata: {
        minRating,
        maxRating,
        minTime,
        maxTime,
        difficulties: RecipeUtils.getDifficulties(recipes),
        tags: RecipeUtils.getTags(recipes),
      },
    });
  } catch (err) {
    APIUtils.setResponse(response, 500, {
      error: { message: 'Error finding recipes', error: err },
      requerequest: request.body,
    });
  }
};

// Post a recipe
export const postRecipe = async ({ response, request }: Context) => {
  try {
    const recipeData = JSON.parse(request.body.recipe);
    if (!recipeData.name || !recipeData.user) {
      APIUtils.setResponse(response, 400, {
        error: { message: 'Recipe name and user name are required' },
        request: request.body,
      });
      return;
    } else if (recipeData.user && !recipeData.user.name) {
      APIUtils.setResponse(response, 400, {
        error: { message: 'Recipe user name is required' },
        request: request.body,
      });
      return;
    }
    const res = await APIUtils.uploadImage(
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
        APIUtils.setResponse(response, 200, { recipe });
      })
      .catch(async (err) => {
        if (err.name === 'ValidationError') {
          const errors = Object.keys(err.errors).map((key) => {
            return { message: err.errors[key].message, field: key };
          });
          APIUtils.setResponse(response, 400, {
            error: { message: err._message, errors: errors },
            request: request.body,
          });
        } else {
          APIUtils.setResponse(response, 500, {
            error: { message: 'Error creating the new recipe', error: err },
            request: request.body,
          });
        }
        await APIUtils.deleteImage(fileId);
      });
  } catch (err) {
    APIUtils.setResponse(response, 500, {
      error: { message: 'Error uploading recipe image', error: err },
      request: request.body,
    });
  }
};

// Update a recipe
export const updateRecipe = async ({ response, request, params }: Context) => {
  if (!RecipeUtils.isValidUpdate(request.body.update)) {
    APIUtils.setResponse(response, 400, {
      error: { message: 'Update is not permitted' },
      request: request.body,
    });
  } else {
    if (!params.id) {
      APIUtils.setResponse(response, 400, {
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
          APIUtils.setResponse(response, 404, {
            error: { message: 'Recipe not found' },
            request: request.body,
          });
        } else {
          APIUtils.setResponse(response, 200, element);
        }
      } catch (err) {
        APIUtils.setResponse(response, 500, {
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
        await APIUtils.deleteImage(recipe?.image.fileId as string);
        APIUtils.setResponse(response, 200, { recipe });
      } catch (err) {
        APIUtils.setResponse(response, 500, {
          error: { message: err },
          request: params.id,
        });
      }
    })
    .catch((err) => {
      APIUtils.setResponse(response, 500, {
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
