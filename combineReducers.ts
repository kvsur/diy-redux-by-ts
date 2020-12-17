import { Action, Reducer, Reducers, State } from "./define";

/**
 * 所有的计划写在一个 reducer 函数里面
 * 会导致 reducer 函数及其庞大复杂。按经验来说
 * 我们肯定会按组件维度来拆分出很多个 reducer 函数，然后通过一个函数来把他们合并起来
 */
export function combineReducers(reducers: Reducers): Reducer {
    /** 获取所有独立reducer的key（名称） */
    const keys = Object.keys(reducers);

    /** 返回所有reducer合并后新的reducer */
    return function combinationReducer(state: State, action: Action) {
        /** 一个新的state */
        const nextState: State = {};

        /** 当传入进来的state是undefin 或者 null，使用newState 代替 */
        state = state || nextState;

        /** 使用action 执行所有的reducer，更新state */
        keys.forEach(key => {
            const reducer = reducers[key];
            const oldBranchState = state[key];
            const newBranchState = reducer(oldBranchState, action);

            nextState[key] = newBranchState;
        });
        
        return nextState;
    }
}