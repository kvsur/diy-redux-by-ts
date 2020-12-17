"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindActionCreators = void 0;
/**
 * 通过闭包的方式隐藏actionCreator和dispatch
 */
function bindActionCreator(actionCreator, dispatch) {
    return function () {
        /** 这里this取决于执行环境，在哪里使用就会指向当前的this */
        return dispatch(actionCreator.apply(this, arguments));
    };
}
/**
 * 第一个参数要么是一个action 创建函数，要么是一个素的对象且key对应的value是一个 ActionCreator
 */
function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch);
    }
    if (typeof actionCreators !== 'object' || actionCreators === null) {
        throw new Error('ActionCreator must be plain and value type is a function can return an action, or just a function can return an action');
    }
    var actionCreatorKeys = Object.keys(actionCreators);
    var boundActionCreators = {};
    actionCreatorKeys.forEach(function (key) {
        var actionCreator = actionCreators[key];
        if (typeof actionCreator === 'function') {
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
        }
    });
    return boundActionCreators;
}
exports.bindActionCreators = bindActionCreators;
