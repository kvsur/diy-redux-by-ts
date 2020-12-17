import { Action, Reducer, Reducers, State } from "./define";

export function combineReducers(reducers: Reducers): Reducer {
    const keys = Object.keys(reducers);

    return function combination(state: State, action: Action) {
        const nextState: State = {};

        state = state || nextState;

        keys.forEach(key => {
            const reducer = reducers[key];
            const oldBranchState = state[key];
            const newBranchState = reducer(oldBranchState, action);

            nextState[key] = newBranchState;
        });
        
        return nextState;
    }
}