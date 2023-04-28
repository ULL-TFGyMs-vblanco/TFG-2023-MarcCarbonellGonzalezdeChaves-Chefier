"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const recipe_api_1 = require("../services/recipe.api");
const verifyToken_1 = require("../middlewares/verifyToken");
const multer = require('@koa/multer');
const upload = multer();
exports.recipeRouter = new koa_router_1.default();
exports.recipeRouter.get('/api/recipes', async (ctx) => {
    await (0, recipe_api_1.getRecipes)(ctx, ctx.query);
});
exports.recipeRouter.post('/api/recipe', upload('image'), verifyToken_1.verifyToken, recipe_api_1.postRecipe);
