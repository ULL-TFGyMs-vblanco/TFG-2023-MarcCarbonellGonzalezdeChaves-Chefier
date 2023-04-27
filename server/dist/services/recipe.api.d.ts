import { Context } from 'koa';
export declare const getRecipes: ({ response, request }: Context, filter: any) => Promise<void>;
export declare const postRecipe: ({ response, request }: Context) => Promise<void>;
