"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = void 0;
var createStore = function (reducer, initState, rewriteCreateStoreFn) {
    if (typeof initState === 'function') {
        rewriteCreateStoreFn = initState;
        initState = undefined;
    }
    if (rewriteCreateStoreFn) {
        var newCreateStore = rewriteCreateStoreFn(exports.createStore);
        return newCreateStore(reducer, initState);
    }
    var state = initState;
    var listeners = [];
    function subscribe(listener) {
        listeners.push(listener);
        return function () {
            var index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }
    function dispatch(action) {
        // state = newState;
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
exports.createStore = createStore;
