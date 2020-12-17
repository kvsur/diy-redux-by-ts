import { Middleware, RCSF } from "./define";
/**
 * 中间件是对 dispatch 的扩展，或者说重写，增强 dispatch 的功能
 */
export declare const applyMiddlewares: (...middlewares: Middleware[]) => RCSF;
