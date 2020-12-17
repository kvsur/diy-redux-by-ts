import { ActionCreator, ActionCreators, BoundActionCreators, Dispatch } from "./define";
/**
 * 通过闭包的方式隐藏actionCreator和dispatch
 */
function bindActionCreator(actionCreator: ActionCreator, dispatch: Dispatch) {
    return function() {
        /** 这里this取决于执行环境，在哪里使用就会指向当前的this */
        return dispatch(actionCreator.apply(this, arguments));
    }
}
/**
 * 第一个参数要么是一个action 创建函数，要么是一个素的对象且key对应的value是一个 ActionCreator
 */
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
