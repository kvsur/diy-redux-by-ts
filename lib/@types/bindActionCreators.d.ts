import { ActionCreator, ActionCreators, BoundActionCreators, Dispatch } from "./define";
/**
 * 第一个参数要么是一个action 创建函数，要么是一个素的对象且key对应的value是一个 ActionCreator
 */
export declare function bindActionCreators(actionCreators: ActionCreator | ActionCreators, dispatch: Dispatch): BoundActionCreators | (() => void);
