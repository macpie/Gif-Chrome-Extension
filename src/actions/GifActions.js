import AppDispatcher from '../dispatcher/AppDispatcher'
import * as GifConstants from '../constants/GifConstants'
import * as GifAPI from '../apis/GifAPI';

export const create = (url, name) => {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

    GifAPI.add({
        id: id,
        url: url,
        name: name
    });

    AppDispatcher.dispatch({
        type: GifConstants.GIF_CREATE,
        id: id,
        url: url,
        name: name
    });
};

export const update = (id, url, name) => {
    AppDispatcher.dispatch({
        type: GifConstants.GIF_UPDATE,
        id: id,
        url: url,
        name: name
    });
};

export const remove = (id) => {
    GifAPI.remove(id);

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

export const loadData = (data) => {
    AppDispatcher.dispatch({
        type: GifConstants.GIF_LOAD,
        data: data
    });
};