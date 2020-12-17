"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMiddlewares = void 0;
var applyMiddlewares = function () {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    var rewriteCreateStoreFn = function (oldCreateStore) {
        var newCreateStore = function (reducer, initState) {
            var store = oldCreateStore(reducer, initState);
            var dispatch = store.dispatch;
            var simpleStore = {
                getState: store.getState
            };
            var middlewaresWithStore = middlewares.map(function (middleware) { return middleware(simpleStore); });
            middlewaresWithStore.reverse().forEach(function (middleware) {
                dispatch = middleware(dispatch);
            });
            store.dispatch = dispatch;
            return store;
        };
        return newCreateStore;
    };
    return rewriteCreateStoreFn;
};
exports.applyMiddlewares = applyMiddlewares;
