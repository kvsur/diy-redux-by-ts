exports.logger = store => next => action => {
    console.log('Current State: ', store.getState());
    console.log('Action: ', action);
    next(action);
    console.log('Next State: ', store.getState());
}

exports.exception = store => next => action => {
    try {
        next(action);
    } catch (err) {
        console.error('Error Catched, will post to server DB', err);
    }
}

exports.timeLogger = store => next => action => {
    console.log('Time: ', new Date().getTime());
    next(action);
}