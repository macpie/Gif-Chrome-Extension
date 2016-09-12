import * as _ from 'lodash';
import {
    GIF_CREATE,
    GIF_UPDATE,
    GIF_UPLOAD,
    GIF_REMOVE,
    GIFS_GET,
    GIFS_IMPORT,
    GIFS_RESET_PRIORITY,
} from '../constants/Gif';

export default (state = {}, action) => {
    let payload = action.payload;

    switch (action.type) {
        case `${GIF_CREATE}_RESOLVED`:
            return Object.assign({}, state, {
                [payload.id]: payload
            });
        case `${GIF_UPDATE}_RESOLVED`:
            let id = payload.id,
                gif = Object.assign({}, state[id], payload);

            return Object.assign({}, state, {
                [id]: gif
            });
        case `${GIF_UPLOAD}_RESOLVED`:
            return Object.assign({}, state, {
                [payload.id]: payload
            });
        case `${GIF_REMOVE}_RESOLVED`:
            return _.omit(state, [payload.id]);
        case `${GIFS_GET}_RESOLVED`:
            return payload;
        case `${GIFS_IMPORT}_RESOLVED`:
            return payload;
        case `${GIFS_RESET_PRIORITY}_RESOLVED`:
            return payload;
        default:
            return state
    }
};