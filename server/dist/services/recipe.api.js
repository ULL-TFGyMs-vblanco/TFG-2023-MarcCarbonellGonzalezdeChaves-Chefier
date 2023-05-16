"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipe = exports.updateRecipe = exports.postRecipe = exports.getRecipes = exports.getRecipe = void 0;
const recipe_1 = require("../models/recipe");
const APIUtils_1 = __importDefault(require("../utils/APIUtils"));
// Get recipes by id
const getRecipe = async ({ response, request, params }) => {
    await recipe_1.Recipe.findById(params.id)
        .then((recipe) => {
        if (!recipe) {
            APIUtils_1.default.setResponse(response, 404, {
                error: { message: 'Recipe not found' },
                request,
            });
        }
        else {
            APIUtils_1.default.setResponse(response, 200, recipe);
        }
    })
        .catch((err) => {
        APIUtils_1.default.setResponse(response, 500, {
            error: { message: 'Error finding the recipe', error: err },
            requerequest: request.body,
        });
    });
};
exports.getRecipe = getRecipe;
// Get recipes list
const getRecipes = async ({ response, request, query }) => {
    if (!query.page) {
        APIUtils_1.default.setResponse(response, 400, {
            error: { message: 'A page index must be provided' },
            request: request.body,
        });
        return;
    }
    else if (isNaN(Number(query.page))) {
        APIUtils_1.default.setResponse(response, 400, {
            error: { message: 'Page index must be a number' },
            request: request.body,
        });
        return;
    }
    else if (Number(query.page) < 1) {
        APIUtils_1.default.setResponse(response, 400, {
            error: { message: 'Page index must be greater than 0' },
            request: request.body,
        });
        return;
    }
    const { page, search, ...filters } = query;
    const pageIndex = Number(page);
    const aggregate = [];
    if (typeof search === 'string') {
        const $search = APIUtils_1.default.getAggregateSearch(search);
        aggregate.push({ $search });
    }
    if (Object.keys(filters).length > 0) {
        const $match = APIUtils_1.default.getAggregateMatch(filters);
        aggregate.push({ $match });
    }
    try {
        let recipes = [];
        if (aggregate.length === 0) {
            recipes = await recipe_1.Recipe.find().sort({ date: -1 });
        }
        else {
            if (typeof search === 'string') {
                recipes = await recipe_1.Recipe.aggregate(aggregate);
            }
            else {
                recipes = await recipe_1.Recipe.aggregate(aggregate).sort({ date: -1 });
            }
        }
        APIUtils_1.default.setResponse(response, 200, {
            list: recipes.slice((pageIndex - 1) * 1, pageIndex * 1),
            totalPages: Math.ceil(recipes.length / 1),
        });
    }
    catch (err) {
        APIUtils_1.default.setResponse(response, 500, {
            error: { message: 'Error finding recipes', error: err },
            requerequest: request.body,
        });
    }
};
exports.getRecipes = getRecipes;
// Post a recipe
const postRecipe = async ({ response, request }) => {
    try {
        const recipeData = JSON.parse(request.body.recipe);
        if (!recipeData.name || !recipeData.user) {
            APIUtils_1.default.setResponse(response, 400, {
                error: { message: 'Recipe name and user name are required' },
                request: request.body,
            });
            return;
        }
        else if (recipeData.user && !recipeData.user.name) {
            APIUtils_1.default.setResponse(response, 400, {
                error: { message: 'Recipe user name is required' },
                request: request.body,
            });
            return;
        }
        const res = await APIUtils_1.default.uploadImage(request.file.buffer.toString('base64'), recipeData.name, `/images/posts/${recipeData.user.name}`);
        const fileId = res.fileId;
        recipeData.image = {
            url: res.url,
            fileId,
        };
        const recipe = new recipe_1.Recipe(recipeData);
        await recipe_1.Recipe.create(recipe)
            .then((recipe) => {
            APIUtils_1.default.setResponse(response, 200, { recipe });
        })
            .catch(async (err) => {
            if (err.name === 'ValidationError') {
                const errors = Object.keys(err.errors).map((key) => {
                    return { message: err.errors[key].message, field: key };
                });
                APIUtils_1.default.setResponse(response, 400, {
                    error: { message: err._message, errors: errors },
                    request: request.body,
                });
            }
            else {
                APIUtils_1.default.setResponse(response, 500, {
                    error: { message: 'Error creating the new recipe', error: err },
                    request: request.body,
                });
            }
            await APIUtils_1.default.deleteImage(fileId);
        });
    }
    catch (err) {
        APIUtils_1.default.setResponse(response, 500, {
            error: { message: 'Error uploading recipe image', error: err },
            request: request.body,
        });
    }
};
exports.postRecipe = postRecipe;
// Update a recipe
const updateRecipe = async ({ response, request, params }) => {
    if (!APIUtils_1.default.isValidRecipeUpdate(request.body.update)) {
        APIUtils_1.default.setResponse(response, 400, {
            error: { message: 'Update is not permitted' },
            request: request.body,
        });
    }
    else {
        if (!params.id) {
            APIUtils_1.default.setResponse(response, 400, {
                error: { message: 'An id must be provided' },
                request: request.body,
            });
        }
        else {
            try {
                const element = await recipe_1.Recipe.findByIdAndUpdate(params.id, request.body.update, {
                    new: true,
                    runValidators: true,
                });
                if (!element) {
                    APIUtils_1.default.setResponse(response, 404, {
                        error: { message: 'Recipe not found' },
                        request: request.body,
                    });
                }
                else {
                    APIUtils_1.default.setResponse(response, 200, element);
                }
            }
            catch (err) {
                APIUtils_1.default.setResponse(response, 500, {
                    error: { message: JSON.stringify(err), error: err },
                    request: request.body,
                });
            }
        }
    }
};
exports.updateRecipe = updateRecipe;
// Delete a recipe
const deleteRecipe = async ({ response, params }) => {
    await recipe_1.Recipe.findByIdAndDelete(params.id)
        .then(async (recipe) => {
        try {
            await APIUtils_1.default.deleteImage(recipe?.image.fileId);
            APIUtils_1.default.setResponse(response, 200, { recipe });
        }
        catch (err) {
            APIUtils_1.default.setResponse(response, 500, {
                error: { message: err },
                request: params.id,
            });
        }
    })
        .catch((err) => {
        APIUtils_1.default.setResponse(response, 500, {
            error: { message: 'Error deleting the recipe', error: err },
            request: params.id,
        });
    });
};
exports.deleteRecipe = deleteRecipe;
module.exports = {
    getRecipe: exports.getRecipe,
    getRecipes: exports.getRecipes,
    postRecipe: exports.postRecipe,
    updateRecipe: exports.updateRecipe,
    deleteRecipe: exports.deleteRecipe,
};
