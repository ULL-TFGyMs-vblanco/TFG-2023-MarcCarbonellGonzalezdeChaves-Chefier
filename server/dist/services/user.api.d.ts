import { Context } from 'koa';
export declare const register: ({ response, request }: Context) => Promise<void>;
export declare const login: ({ response, request }: Context) => Promise<void>;
export declare const getUser: ({ response, request, params }: Context) => Promise<void>;
