"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const user_api_1 = require("../services/user.api");
const verifyToken_1 = require("../middlewares/verifyToken");
exports.userRouter = new koa_router_1.default();
exports.userRouter.get('/api/username/:username', async (ctx) => {
    await (0, user_api_1.getUser)(ctx, { username: ctx.params.username });
});
exports.userRouter.get('/api/email/:email', async (ctx) => {
    await (0, user_api_1.getUser)(ctx, { email: ctx.params.email });
});
exports.userRouter.post('/api/auth/register', user_api_1.register);
exports.userRouter.post('/api/auth/login', user_api_1.login);
exports.userRouter.patch('/api/user/:id', verifyToken_1.verifyToken, async (ctx) => {
    await (0, user_api_1.updateUser)(ctx);
});
exports.userRouter.patch('/api/users', verifyToken_1.verifyToken, async (ctx) => {
    await (0, user_api_1.updateUser)(ctx, { multiple: true });
});
