import {
    FILTER
} from '../constants/Filter';

export default (state = '', action) => {
    let payload = action.payload;

    if(!payload) payload = '';

    switch (action.type) {
        case `${FILTER}_RESOLVED`:
            return payload;
        default:
            return state
    }
};