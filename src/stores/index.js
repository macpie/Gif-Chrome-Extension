import {
    createStore,
    applyMiddleware
} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import {
    browserHistory
} from 'react-router';
import {
    routerMiddleware
} from 'react-router-redux';
import Reducers from '../reducers';

const initialState = {
        filter: '',
        gifs: {}
    },
    promise = promiseMiddleware({
        promiseTypeSuffixes: ['PENDING', 'RESOLVED', 'REJECTED']
    }),
    router = routerMiddleware(browserHistory),
    middlewares = [thunk, promise, router];

if (process.env.NODE_ENV === 'development') {
    const createLogger = require('redux-logger');

    middlewares.push(createLogger({
        duration: true,
        collapsed: true,
    }));
}

export default createStore(Reducers, initialState, applyMiddleware(...middlewares));