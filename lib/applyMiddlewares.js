"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMiddlewares = void 0;
/**
 * 中间件是对 dispatch 的扩展，或者说重写，增强 dispatch 的功能
 */
exports.applyMiddlewares = function () {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    var rewriteCreateStoreFn = function (oldCreateStore) {
        var newCreateStore = function (reducer, initState) {
            /** 首先拿到初始化store，获取 dispatch */
            var store = oldCreateStore(reducer, initState);
            var dispatch = store.dispatch;
            /** 为了防止中间件对store中的其他属性进行修改操作，这里只是分配getState */
            var simpleStore = {
                getState: store.getState
            };
            /** 给所有的中间件传入store */
            var middlewaresWithStore = middlewares.map(function (middleware) { return middleware(simpleStore); });
            /** 传入next（这里是dispatch）给中间件 */
            /** 所有的中间件都需要在内部执行 next(action) 操作 */
            middlewaresWithStore.reverse().forEach(function (middleware) {
                dispatch = middleware(dispatch);
            });
            /** 重写 store的dispatch 属性， 返回store */
            store.dispatch = dispatch;
            return store;
        };
        return newCreateStore;
    };
    return rewriteCreateStoreFn;
};
