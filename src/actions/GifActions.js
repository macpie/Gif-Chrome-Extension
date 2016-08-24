import * as _ from 'lodash'
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

export const update = (id, name, url, still_url) => {
    AppDispatcher.dispatch({
        type: GifConstants.GIF_UPDATE,
        id: id,
        updates: _.omitBy({
            name: name,
            url: url,
            still_url: still_url
        }, _.isUndefined)
    });
};

export const priority = (id, inc = 1) => {
    AppDispatcher.dispatch({
        type: GifConstants.GIF_PRIORITY,
        id: id,
        inc: inc
    });
};

export const resetPriority = () => {
    AppDispatcher.dispatch({
        type: GifConstants.GIF_RESET_PRIORITY
    });
};

export const upload = (id) => {
    AppDispatcher.dispatch({
        type: GifConstants.GIF_UPLOAD,
        id: id
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

export const importGifs = (data) => {
    AppDispatcher.dispatch({
        type: GifConstants.GIF_IMPORT,
        data: data
    });
};