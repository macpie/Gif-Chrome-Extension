import {
    EventEmitter
} from 'events'
import Immutable from 'immutable'
import Promise from 'promise';
import UUID from 'node-uuid';
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

const create = (url, name = url, still_url = url) => {
    return new Promise((resolve) => {
        let gif = {
                id: UUID.v4(),
                name: name,
                url: url,
                still_url: still_url
            };

        _gifs = _gifs.unshift(gif);
        GifAPI.update(_gifs.toArray());

        resolve();
    });
};

const update = (id, updates) => {
    return new Promise((resolve) => {
        let index = findIndexById(id),
            obj = _gifs.get(index);

        _gifs = _gifs.set(index, Object.assign({}, obj, updates));
        GifAPI.update(_gifs.toArray());

        resolve();
    });
};

const remove = (id) => {
    return new Promise((resolve) => {
        let index = findIndexById(id);

        _gifs = _gifs.delete(index);
        GifAPI.update(_gifs.toArray())

        resolve();
    });
};

const loadGifs = () => {
    return new Promise((resolve) => {
        let data = GifAPI.loadData();

        _gifs = new Immutable.List(data);

        resolve();
    });
};

const filter = (text) => {
    if (text !== '') {
        if (!_tmp) _tmp = _gifs;

        let re = new RegExp(text, 'gi');

        _gifs = _tmp.filter((val) => {
            return val.name.match(re);
        });
    } else {
        _gifs = _tmp;
    }
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
            create(action.url, action.name, action.still_url)
                .then(() => {
                    GifStore.emitChange();
                });
            break;
        case GifConstants.GIF_UPDATE:
            update(action.id, {
                name: action.name,
                url: action.url,
                still_url: action.still_url,
            }).then(() => {
                GifStore.emitChange();
            });
            break;
        case GifConstants.GIF_REMOVE:
            remove(action.id)
                .then(() => {
                    GifStore.emitChange();
                });
            break;
        case GifConstants.GIF_LOAD:
            loadGifs()
                .then(() => {
                    GifStore.emitChange();
                });
            break;
        case GifConstants.GIF_FILTER:
            filter(action.text);
            GifStore.emitChange();
            break;
        default:
            return true;
    }
});

export default GifStore;