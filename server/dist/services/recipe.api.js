"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRecipe = exports.getRecipes = void 0;
const recipe_1 = require("../models/recipe");
const APIUtils_1 = __importDefault(require("../utils/APIUtils"));
// Get recipes list
const getRecipes = async ({ response, request }, filter) => {
    await recipe_1.Recipe.find(filter)
        .then((recipes) => {
        APIUtils_1.default.setResponse(response, 200, recipes);
    })
        .catch((err) => {
        APIUtils_1.default.setResponse(response, 500, {
            error: err,
            requerequest: request.body,
        });
    });
};
exports.getRecipes = getRecipes;
// Post a recipe
const postRecipe = async ({ response, request }) => {
    if (!request.body.recipe) {
        APIUtils_1.default.setResponse(response, 400, {
            error: { message: 'Missing recipe' },
            request: request.body,
        });
        return;
    }
    APIUtils_1.default
        .uploadImage(request.body.recipe.image, request.body.recipe.name, `/images/posts/${request.body.recipe.username}`)
        .then(async (result) => {
        request.body.recipe.image = result.url;
        const fileId = result.fileId;
        const recipe = new recipe_1.Recipe(request.body.recipe);
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
                    error: { message: err },
                    request: request.body,
                });
            }
            await APIUtils_1.default.deleteImage(fileId);
        });
    })
        .catch((err) => {
        APIUtils_1.default.setResponse(response, 500, {
            error: { message: err },
            request: request.body,
        });
    });
};
exports.postRecipe = postRecipe;
module.exports = {
    getRecipes: exports.getRecipes,
    postRecipe: exports.postRecipe,
};
