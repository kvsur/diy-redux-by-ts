import { ActionCreator, ActionCreators, BoundActionCreators, Dispatch } from "./define";

function bindActionCreator(actionCreator: ActionCreator, dispatch: Dispatch) {
    return function() {
        return dispatch(actionCreator.apply(this, arguments));
    }
}

export function bindActionCreators(actionCreators: ActionCreator | ActionCreators, dispatch: Dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch);
    }

    if (typeof actionCreators !== 'object' || actionCreators === null) {
        throw new Error('ActionCreator must be plain and value type is a function can return an action, or just a function can return an action');
    }

    const actionCreatorKeys = Object.keys(actionCreators);
    const boundActionCreators: BoundActionCreators = {};

    actionCreatorKeys.forEach(key => {
        const actionCreator = actionCreators[key];
        if (typeof actionCreator === 'function') {
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
        }
    });

    return boundActionCreators;
}
