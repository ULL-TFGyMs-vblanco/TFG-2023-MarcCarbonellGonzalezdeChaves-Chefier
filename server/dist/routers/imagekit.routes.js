"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagekitRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const imagekit_1 = __importDefault(require("imagekit"));
exports.imagekitRouter = new koa_router_1.default();
const imagekit = new imagekit_1.default({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});
exports.imagekitRouter.get('/api/imagekit/auth', async (ctx) => {
    const result = imagekit.getAuthenticationParameters();
    ctx.body = result;
});
