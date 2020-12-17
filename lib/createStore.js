"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = void 0;
exports.createStore = function (reducer, initState, rewriteCreateStoreFn) {
    /**
     * 如果没有传入initState 且需要重写createStore时，第二个参数就是 rewriteCreateStoreFn
     * @usage createStore(reducer, rewriteCreateStoreFn)
     */
    if (typeof initState === 'function') {
        rewriteCreateStoreFn = initState;
        initState = undefined;
    }
    /**
     * 如果传入了rewriteCreateStoreFn（就是把当前createStore 传入 applyMiddlewares 返回的 newCreateStore）
     * 则直接使用 rewriteCreateStoreFn 生成的 createStore
     */
    if (rewriteCreateStoreFn) {
        var newCreateStore = rewriteCreateStoreFn(exports.createStore);
        return newCreateStore(reducer, initState);
    }
    var state = initState;
    var listeners = [];
    /** 订阅 */
    function subscribe(listener) {
        listeners.push(listener);
        /** 返回取消订阅的函数 */
        return function () {
            var index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }
    function dispatch(action) {
        state = reducer(state, action);
        for (var i = 0; i < listeners.length; i++) {
            var listener = listeners[i];
            listener();
        }
    }
    function getState() {
        return state;
    }
    function replaceReducer(newReducer) {
        reducer = newReducer;
        dispatch({ type: Symbol() });
    }
    dispatch({ type: Symbol() });
    return {
        subscribe: subscribe,
        getState: getState,
        dispatch: dispatch,
        replaceReducer: replaceReducer
    };
};
