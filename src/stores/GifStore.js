import {
    EventEmitter
} from 'events'
import Immutable from 'immutable'
import AppDispatcher from '../dispatcher/AppDispatcher'
import * as GifConstants from '../constants/GifConstants'
import * as GifAPI from '../apis/GifAPI';

const CHANGE_EVENT = 'change';

var _gifs = new Immutable.List([]),
    _tmp = null;

const findIndexById = (id) => {
    return _gifs.findIndex((val) => {
        if (val.id === id) {
            return true;
        } else {
            return false;
        }
    });
};

const create = (url, name = url) => {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

    GifAPI.add({
        id: id,
        url: url,
        name: name
    });

    _gifs = _gifs.push({
        id: id,
        name: name,
        url: url
    });
};

const update = (id, updates) => {
    let index = findIndexById(id),
        obj = _gifs.get(index);

    _gifs = _gifs.set(index,  Object.assign({}, obj, updates));
};

const remove = (id) => {
    let index = findIndexById(id);

    GifAPI.remove(id);

    _gifs = _gifs.delete(index);
};

const filter = (text) => {
    if (text !== '') {
        if (!_tmp) _tmp = _gifs;

        let re = new RegExp(text, 'g');

        _gifs = _tmp.filter((val) => {
            return val.name.match(re);
        });
    } else {
        _gifs = _tmp;
    }
};

const loadGifs = (data) => {
    _gifs = new Immutable.List(data);
};

const GifStore = Object.assign({}, EventEmitter.prototype, {
    getAll: () => {
        return _gifs.toArray();
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
            create(action.url, action.name);
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