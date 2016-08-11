import {
    EventEmitter
} from 'events'
import * as _ from 'lodash'
import AppDispatcher from '../dispatcher/AppDispatcher'
import * as GifConstants from '../constants/GifConstants'

const CHANGE_EVENT = 'change';

var _gifs = [],
    _tmp = null;

const getIndex = (id) => {
    return _.findIndex(_gifs, (gif) => {
        return gif.id === id;
    });
};

const create = (id, url, name = url) => {
    _gifs.push({
        id: id,
        name: name,
        url: url
    });
};

const update = (id, updates) => {
    let index = getIndex(id);

    _gifs[index] = Object.assign({}, _gifs[index], updates);
};

const remove = (id) => {
    let index = getIndex(id);

    _gifs.splice(index, 1);
};

const filter = (text) => {
    if (text !== '') {
        if (!_tmp) _tmp = _gifs;

        let re = new RegExp(text, 'g');

        _gifs = _.filter(_tmp, (gif) => {
            return gif.name.match(re);
        });
    } else {
        _gifs = _tmp;
    }
};

const loadGifs = (data) => {
    _gifs = data;
};

var GifStore = Object.assign({}, EventEmitter.prototype, {
    getAll: () => {
        return _gifs;
    },
    emitChange: () => {
        GifStore.emit(CHANGE_EVENT);
    },
    addChangeListener: (callback) => {
        GifStore.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: (callback) => {
        GifStore.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register((action) => {
    switch (action.type) {
        case GifConstants.GIF_CREATE:
            create(action.id, action.url, action.name);
            GifStore.emitChange();
            break;
        case GifConstants.GIF_UPDATE:
            update(action.id, {
                name: action.name,
                url: action.url
            });
            GifStore.emitChange();
            break;
        case GifConstants.GIF_REMOVE:
            remove(action.id);
            GifStore.emitChange();
            break;
        case GifConstants.GIF_FILTER:
            filter(action.text);
            GifStore.emitChange();
            break;
        case GifConstants.GIF_LOAD:
            loadGifs(action.data);
            GifStore.emitChange();
            break;
        default:
            return true;
    }
});

export default GifStore;