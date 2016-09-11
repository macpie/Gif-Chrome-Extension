import {
    createStore,
    applyMiddleware
} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import Reducers from '../reducers';

const initialState = {
        filter: '',
        gifs: {}
    },
    promise = promiseMiddleware({
        promiseTypeSuffixes: ['PENDING', 'RESOLVED', 'REJECTED']
    }),
    middlewares = [thunk, promise];

if (process.env.NODE_ENV === 'development') {
    const createLogger = require('redux-logger');

    middlewares.push(createLogger({
        duration: true,
        collapsed: true,
    }));
}

export default createStore(Reducers, initialState, applyMiddleware(...middlewares));