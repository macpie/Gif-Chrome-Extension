import {
    EventEmitter
} from 'events'
import Immutable from 'immutable'
import Promise from 'promise';
import UUID from 'node-uuid';
import AppDispatcher from '../dispatcher/AppDispatcher'
import * as GifConstants from '../constants/GifConstants'
import * as GifAPI from '../apis/GifAPI';
import * as GiphyAPI from '../apis/GiphyAPI';

const CHANGE_EVENT = 'change';
const GIFS = 'gifs';
const FILTER = 'filter';

var STATE = new Immutable.Map({
    [GIFS]: new Immutable.Map(),
    [FILTER]: ''
});

const getGifs = () => {
    return STATE.get(GIFS);
};

const setGifs = (data) => {
    STATE = STATE.set(GIFS, data);
};

const getGif = (id) => {
    let gifs = getGifs();

    return gifs.get(id);
};

const setGif = (id, data) => {
    let gifs = getGifs();

    setGifs(gifs.set(id, data));
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
            GiphyAPI.uploadGet(name, url)
                .then((data) => {
                    gif = Object.assign({}, gif, data);
                    setGif(gif.id, gif);
                    resolve();
                })
                .catch((error) => {
                    console.error(error);
                    setGif(gif.id, gif);
                    resolve();
                });

        } else if (!still_url && GiphyAPI.isGiphyUrl(url)) {
            gif = Object.assign({}, gif, {
                still_url: GiphyAPI.getStillFromUrl(url)
            });
            setGif(gif.id, gif);
            resolve();
        } else {
            setGif(gif.id, gif);
            resolve();
        }
    });
};

const update = (id, updates) => {
    return new Promise((resolve) => {
        let gif = getGif(id);

        setGif(id, Object.assign({}, gif, updates));
        resolve();
    });
};

const upload = (id) => {
    return new Promise((resolve, reject) => {
        let gif = getGif(id);

        if (!GiphyAPI.isGiphyUrl(gif.url)) {
            GiphyAPI.uploadGet(gif.name, gif.url)
                .then((updates) => {
                    setGif(id, Object.assign({}, gif, updates));
                    resolve();
                })
                .catch(reject);
        } else if (!gif.still_url && GiphyAPI.isGiphyUrl(gif.url)) {
            setGif(id, Object.assign({}, gif, {
                still_url: GiphyAPI.getStillFromUrl(gif.url)
            }));
            resolve();
        } else {
            resolve();
        }
    });
};

const priority = (id, inc = 1) => {
    return new Promise((resolve, reject) => {
        let gif = getGif(id),
            value = gif.priority || 0,
            updates = {
                priority: value += inc
            };

        setGif(id, Object.assign({}, gif, updates));
        resolve();
    });
};

const resetPriority = () => {
    return new Promise((resolve, reject) => {
        let gifs = getGifs();

        setGifs(gifs.map((gif) => {
            return Object.assign({}, gif, {
                priority: 0
            });
        }));

        resolve();
    });
};

const remove = (id) => {
    return new Promise((resolve) => {
        let gifs = getGifs();

        setGifs(gifs.delete(id));

        resolve();
    });
};

const loadGifs = () => {
    return new Promise((resolve) => {
        let data = GifAPI.loadData();

        setGifs(new Immutable.Map(data));

        resolve();
    });
};

const importGifs = (data) => {
    return new Promise((resolve) => {
        setGifs(new Immutable.Map(data));
        resolve();
    });
};

const filter = (text) => {
    STATE = STATE.set(FILTER, text);
};

const GifStore = Object.assign({}, EventEmitter.prototype, {
    getRawGifs: () => {
        return getGifs();
    },
    getGifs: () => {
        return getGifs().toArray();
    },
    getGifsSize: () => {
        return getGifs().count();
    },
    getFilter: () => {
        return STATE.get(FILTER);
    },
    emitChange: () => {
        let gifs = getGifs();

        GifAPI.update(gifs.toObject());

        GifStore.emit(CHANGE_EVENT);
    },
    addChangeListener: (callback) => {
        GifStore.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: (callback) => {
        GifStore.removeListener(CHANGE_EVENT, callback);
    }
});

const handleReject = (error) => {
    toastr.error(error.msg, error.name);
    console.error(error);
};

AppDispatcher.register((action) => {
    switch (action.type) {
        case GifConstants.GIF_CREATE:
            create(action.url, action.name, action.still_url)
                .then(() => {
                    toastr.success('GIF added!');
                    GifStore.emitChange();
                })
                .catch(handleReject);
            break;
        case GifConstants.GIF_UPDATE:
            update(action.id, action.updates)
                .then(() => {
                    toastr.success('GIF updated!');
                    GifStore.emitChange();
                })
                .catch(handleReject);
            break;
        case GifConstants.GIF_PRIORITY:
            priority(action.id, action.inc)
                .then(() => {
                    GifStore.emitChange();
                })
                .catch(handleReject);
            break;
        case GifConstants.GIF_RESET_PRIORITY:
            resetPriority()
                .then(() => {
                    toastr.success('GIFs priority reseted!');
                    GifStore.emitChange();
                })
                .catch(handleReject);
            break;
        case GifConstants.GIF_UPLOAD:
            upload(action.id)
                .then(() => {
                    toastr.success('GIF uploaded!');
                    GifStore.emitChange();
                })
                .catch(handleReject);
            break;

        case GifConstants.GIF_REMOVE:
            remove(action.id)
                .then(() => {
                    toastr.success('GIF removed!');
                    GifStore.emitChange();
                })
                .catch(handleReject);
            break;
        case GifConstants.GIF_FILTER:
            filter(action.text);
            GifStore.emitChange();
            break;
        case GifConstants.GIF_LOAD:
            loadGifs()
                .then(() => {
                    GifStore.emitChange();
                })
                .catch(handleReject);
            break;
        case GifConstants.GIF_IMPORT:
            importGifs(action.data)
                .then(() => {
                    GifStore.emitChange();
                })
                .catch(handleReject);
            break;
        default:
            return true;
    }
});

export default GifStore;