import AppDispatcher from '../dispatcher/AppDispatcher'
import * as GifConstants from '../constants/GifConstants'

export const create = (url, name, still_url) => {
    AppDispatcher.dispatch({
        type: GifConstants.GIF_CREATE,
        url: url,
        name: name,
        still_url: still_url
    });
};

export const update = (id, url, name, still_url) => {
    AppDispatcher.dispatch({
        type: GifConstants.GIF_UPDATE,
        id: id,
        url: url,
        name: name,
        still_url: still_url
    });
};

export const remove = (id) => {
    AppDispatcher.dispatch({
        type: GifConstants.GIF_REMOVE,
        id: id
    });
};

export const filter = (text) => {
    AppDispatcher.dispatch({
        type: GifConstants.GIF_FILTER,
        text: text
    });
};

export const loadData = () => {
    AppDispatcher.dispatch({
        type: GifConstants.GIF_LOAD
    });
};