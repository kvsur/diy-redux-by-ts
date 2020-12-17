import { CreateStore, Store, RCSF, Fn, Action, State, Reducer } from "./define";

export const createStore: CreateStore = function (reducer ,initState, rewriteCreateStoreFn): Store {
    if (typeof initState === 'function') {
        rewriteCreateStoreFn = <RCSF>initState;
        initState = undefined;
    }
    if (rewriteCreateStoreFn) {
        const newCreateStore = rewriteCreateStoreFn(createStore);
        return newCreateStore(reducer, initState);
    }

    let state = initState;
    let listeners: Fn[] = [];

    function subscribe(listener: Fn) {
        listeners.push(listener);

        return function() {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }
    }

    function dispatch(action: Action) {
        // state = newState;
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
