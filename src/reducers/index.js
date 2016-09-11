import {
    combineReducers
} from 'redux';
import {
    routerReducer
} from 'react-router-redux';
import filter from './Filter';
import gifs from './Gifs';

export default combineReducers({
    filter,
    gifs,
    routing: routerReducer
});