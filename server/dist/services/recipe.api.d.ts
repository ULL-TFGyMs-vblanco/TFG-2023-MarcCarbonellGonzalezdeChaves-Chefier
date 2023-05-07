import { Context } from 'koa';
export declare const getRecipe: ({ response, request, params }: Context) => Promise<void>;
export declare const getRecipes: ({ response, request, query }: Context) => Promise<void>;
export declare const postRecipe: ({ response, request }: Context) => Promise<void>;
export declare const updateRecipe: ({ response, request, params }: Context) => Promise<void>;
export declare const deleteRecipe: ({ response, params }: Context) => Promise<void>;
