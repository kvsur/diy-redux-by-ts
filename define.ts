
export type Fn = () => void;

export type Dispatch = (action: Action) => void;

export type ActionCreator = (...args: any[]) => Action;

export type Reducer = (state: State, action: Action) => State;

export type RCSF = (oldCreateStore: CreateStore) => CreateStore;

/** 中间件是对 dispatch 的扩展，或者说重写，增强 dispatch 的功能 */
export type Middleware = (store: Partial<Store>) => (next: Dispatch) => (action: Action) => void;

export type CreateStore = (reducer: Reducer, initState?: State | RCSF, rewriteCreateStoreFn?: RCSF) => Store;

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
