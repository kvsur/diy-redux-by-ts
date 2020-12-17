import { CreateStore, Middleware, RCSF } from "./define";

/**
 * 中间件是对 dispatch 的扩展，或者说重写，增强 dispatch 的功能
 */
export const applyMiddlewares = (...middlewares: Middleware[]) => {

    const rewriteCreateStoreFn:RCSF = (oldCreateStore) => {

        const newCreateStore: CreateStore = (reducer, initState) => {
            /** 首先拿到初始化store，获取 dispatch */
            const store = oldCreateStore(reducer, initState);
            let dispatch = store.dispatch;

            /** 为了防止中间件对store中的其他属性进行修改操作，这里只是分配getState */
            const simpleStore = {
                getState: store.getState
            };
            /** 给所有的中间件传入store */
            const middlewaresWithStore = middlewares.map(middleware => middleware(simpleStore));
            /** 传入next（这里是dispatch）给中间件 */
            /** 所有的中间件都需要在内部执行 next(action) 操作 */
            middlewaresWithStore.reverse().forEach(middleware => {
                dispatch = middleware(dispatch);
            });

            /** 重写 store的dispatch 属性， 返回store */
            store.dispatch = dispatch;
            return store;
        }

        return newCreateStore;
    }
    return rewriteCreateStoreFn;
};