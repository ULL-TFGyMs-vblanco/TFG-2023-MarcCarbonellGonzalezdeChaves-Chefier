import { Context } from 'koa';
export declare const register: ({ response, request }: Context) => Promise<void>;
export declare const login: ({ response, request }: Context) => Promise<void>;
export declare const getUser: ({ response, request }: Context, filter: any) => Promise<void>;
export declare const updateUser: ({ response, request, params }: Context, options?: {
    multiple: boolean;
}) => Promise<void>;
