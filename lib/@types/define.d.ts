export declare type Fn = () => void;
export declare type Dispatch = (action: Action) => void;
export declare type ActionCreator = (...args: any[]) => Action;
export declare type Reducer = (state: State, action: Action) => State;
export declare type RCSF = (oldCreateStore: CreateStore) => CreateStore;
export declare type Middleware = (store: Partial<Store>) => (next: Dispatch) => (action: Action) => void;
export declare type CreateStore = (reducer: Reducer, initState?: State | RCSF, rewriteCreateStoreFn?: RCSF) => Store;
export interface Reducers {
    [x: string]: Reducer;
}
export interface State {
    [x: string]: any;
}
export interface Store {
    subscribe: (listener: Fn) => void;
    dispatch: Dispatch;
    getState: () => State;
    replaceReducer: (newReducer: Reducer) => void;
}
export interface Action {
    type: string | symbol;
    [x: string]: any;
}
export interface ActionCreators {
    [x: string]: ActionCreator;
}
export interface BoundActionCreators {
    [x: string]: Function;
}
