import {
    EventEmitter
} from 'events'
import Immutable from 'immutable'
import Promise from 'promise';
import UUID from 'node-uuid';
import * as _ from 'lodash';
import AppDispatcher from '../dispatcher/AppDispatcher'
import * as GifConstants from '../constants/GifConstants'
import * as GifAPI from '../apis/GifAPI';
import * as GiphyAPI from '../apis/GiphyAPI';

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

const upload = (name, url) => {
    return new Promise((resolve, reject) => {
        GiphyAPI.upload(name, url)
            .then((body) => {
                var id = body.data.id;

                GiphyAPI.get(id)
                    .then((body) => {
                        let data = body.data;

                        resolve({
                            url: data.images.downsized.url,
                            still_url: data.images.downsized_still.url
                        });
                    })
                    .catch((error) => {
                        reject({
                            name: 'Giphy',
                            status: error.status,
                            msg: error.msg
                        });
                    });
            })
            .catch((error) => {
                reject({
                    name: 'Giphy',
                    status: error.status,
                    msg: error.msg
                });
            });
    });
};

const create = (url, name = url, still_url) => {
    return new Promise((resolve, reject) => {
        let gif = {
            id: UUID.v4(),
            name: name,
            url: url,
            still_url: still_url
        };

        if (!still_url && !GiphyAPI.isGiphyUrl(url)) {
            upload(name, url)
                .then((data) => {
                    gif = Object.assign({}, gif, data);

                    _gifs = _gifs.push(gif);
                    GifAPI.update(_gifs.toArray());

                    resolve();
                })
                .catch((error) => {
                    console.error(error);

                    toastr.warning('Failed to upload to Giphy'); //eslint-disable-line no-undef

                    _gifs = _gifs.push(gif);
                    GifAPI.update(_gifs.toArray());

                    resolve();
                });

        } else if (!still_url && GiphyAPI.isGiphyUrl(url)) {
            gif.still_url = GiphyAPI.getStillFromUrl(url)

            _gifs = _gifs.push(gif);
            GifAPI.update(_gifs.toArray());

            resolve();
        } else {
            _gifs = _gifs.push(gif);
            GifAPI.update(_gifs.toArray());

            resolve();
        }
    });
};

const update = (id, updates) => {
    return new Promise((resolve) => {
        let index = findIndexById(id),
            obj = _gifs.get(index);

        console.log(updates);

        _gifs = _gifs.set(index, Object.assign({}, obj, updates));
        GifAPI.update(_gifs.toArray());

        resolve();
    });
};

const remove = (id) => {
    return new Promise((resolve) => {
        let index = findIndexById(id);

        _gifs = _gifs.delete(index);
        GifAPI.update(_gifs.toArray());

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
        return _.sortBy(_gifs.toArray(), 'name');
    },
    size: () => {
        return _gifs.size;
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

const handleReject = (error, title) => {
    toastr.error(error.msg || error, error.name); //eslint-disable-line no-undef
    console.error(error);
};

AppDispatcher.register((action) => {
    switch (action.type) {
        case GifConstants.GIF_CREATE:
            create(action.url, action.name, action.still_url)
                .then(() => {
                    toastr.success('GIF added!'); //eslint-disable-line no-undef
                    GifStore.emitChange();
                })
                .catch(handleReject);
            break;
        case GifConstants.GIF_UPDATE:
            update(action.id, {
                name: action.name
            }).then(() => {
                toastr.success('GIF updated!'); //eslint-disable-line no-undef
                GifStore.emitChange();
            });
            break;
        case GifConstants.GIF_REMOVE:
            remove(action.id)
                .then(() => {
                    toastr.success('GIF removed!'); //eslint-disable-line no-undef
                    GifStore.emitChange();
                })
                .catch(handleReject);
            break;
        case GifConstants.GIF_LOAD:
            loadGifs()
                .then(() => {
                    GifStore.emitChange();
                })
                .catch(handleReject);
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