"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const recipe_api_1 = require("../services/recipe.api");
const verifyToken_1 = require("../middlewares/verifyToken");
const koa_multer_esm_1 = __importDefault(require("koa-multer-esm"));
const upload = (0, koa_multer_esm_1.default)();
exports.recipeRouter = new koa_router_1.default();
// Route to get a recipe by id
exports.recipeRouter.get('/api/recipe/:id', recipe_api_1.getRecipe);
// Route to get multiple recipes
exports.recipeRouter.get('/api/recipes', recipe_api_1.getRecipes);
// Route to post a recipe
exports.recipeRouter.post('/api/recipe', upload.single('image'), verifyToken_1.verifyToken, recipe_api_1.postRecipe);
// Route to update a recipe
exports.recipeRouter.patch('/api/recipe/:id', verifyToken_1.verifyToken, recipe_api_1.updateRecipe);
// Route to delete a recipe
exports.recipeRouter.delete('/api/recipe/:id', verifyToken_1.verifyToken, recipe_api_1.deleteRecipe);
