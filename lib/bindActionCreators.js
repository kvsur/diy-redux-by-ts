"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindActionCreators = void 0;
function bindActionCreator(actionCreator, dispatch) {
    return function () {
        return dispatch(actionCreator.apply(this, arguments));
    };
}
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
