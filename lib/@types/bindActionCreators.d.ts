import { ActionCreator, ActionCreators, BoundActionCreators, Dispatch } from "./define";
export declare function bindActionCreators(actionCreators: ActionCreator | ActionCreators, dispatch: Dispatch): BoundActionCreators | (() => void);
