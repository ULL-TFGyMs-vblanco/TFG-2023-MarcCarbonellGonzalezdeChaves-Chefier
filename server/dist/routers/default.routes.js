"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const swagger = require('../../swagger.json');
exports.defaultRouter = new koa_router_1.default();
// Route to get API documentation in JSON format
exports.defaultRouter.get('/swagger.json', (ctx) => {
    ctx.response.body = swagger;
});
// Default route
exports.defaultRouter.all('(.*)', (ctx) => {
    ctx.response.status = 501;
});
