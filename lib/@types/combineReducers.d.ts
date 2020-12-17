import { Reducer, Reducers } from "./define";
/**
 * 所有的计划写在一个 reducer 函数里面
 * 会导致 reducer 函数及其庞大复杂。按经验来说
 * 我们肯定会按组件维度来拆分出很多个 reducer 函数，然后通过一个函数来把他们合并起来
 */
export declare function combineReducers(reducers: Reducers): Reducer;
