"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineReducers = void 0;
/**
 * 所有的计划写在一个 reducer 函数里面
 * 会导致 reducer 函数及其庞大复杂。按经验来说
 * 我们肯定会按组件维度来拆分出很多个 reducer 函数，然后通过一个函数来把他们合并起来
 */
function combineReducers(reducers) {
    /** 获取所有独立reducer的key（名称） */
    var keys = Object.keys(reducers);
    /** 返回所有reducer合并后新的reducer */
    return function combinationReducer(state, action) {
        /** 一个新的state */
        var nextState = {};
        /** 当传入进来的state是undefin 或者 null，使用newState 代替 */
        state = state || nextState;
        /** 使用action 执行所有的reducer，更新state */
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
