import {
    FILTER
} from '../constants/Filter';

export default (state = '', action) => {
    let payload = action.payload;

    switch (action.type) {
        case `${FILTER}_RESOLVED`:
            return payload;
        default:
            return state
    }
};