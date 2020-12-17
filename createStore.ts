import { CreateStore, Store, RCSF, Fn, Action, State, Reducer } from "./define";

export const createStore: CreateStore = function (reducer ,initState, rewriteCreateStoreFn): Store {
    /**
     * 如果没有传入initState 且需要重写createStore时，第二个参数就是 rewriteCreateStoreFn
     * @usage createStore(reducer, rewriteCreateStoreFn)
     */
    if (typeof initState === 'function') {
        rewriteCreateStoreFn = <RCSF>initState;
        initState = undefined;
    }
    /**
     * 如果传入了rewriteCreateStoreFn（就是把当前createStore 传入 applyMiddlewares 返回的 newCreateStore）
     * 则直接使用 rewriteCreateStoreFn 生成的 createStore
     */
    if (rewriteCreateStoreFn) {
        const newCreateStore = rewriteCreateStoreFn(createStore);
        return newCreateStore(reducer, initState);
    }

    let state = initState;
    let listeners: Fn[] = [];

    /** 订阅 */
    function subscribe(listener: Fn) {
        listeners.push(listener);

        /** 返回取消订阅的函数 */
        return function() {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }
    }

    function dispatch(action: Action) {
        state = reducer(state, action)

        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    }

    function getState(): State {
        return state;
    }

    function replaceReducer(newReducer: Reducer) {
        reducer = newReducer;
        dispatch({ type: Symbol() });
    }

    dispatch({ type: Symbol() });

    return {
        subscribe,
        getState,
        dispatch,
        replaceReducer
    };
}
