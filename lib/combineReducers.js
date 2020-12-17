"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineReducers = void 0;
function combineReducers(reducers) {
    var keys = Object.keys(reducers);
    return function combination(state, action) {
        var nextState = {};
        state = state || nextState;
        keys.forEach(function (key) {
            var reducer = reducers[key];
            var oldBranchState = state[key];
            var newBranchState = reducer(oldBranchState, action);
            nextState[key] = newBranchState;
        });
        return nextState;
    };
}
exports.combineReducers = combineReducers;
