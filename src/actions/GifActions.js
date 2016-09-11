import Promise from 'promise';
import UUID from 'node-uuid';
import * as _ from 'lodash';
import {
    GIF_CREATE,
    GIF_UPDATE,
    GIF_UPLOAD,
    GIF_REMOVE,
} from '../constants/Gif';
import * as GifAPI from '../apis/GifAPI';
import * as GiphyAPI from '../apis/GiphyAPI';

export const create = (name, url, still_url) => {
    return {
        type: GIF_CREATE,
        payload: new Promise((resolve) => {
            let gif = {
                id: UUID.v4(),
                name: name,
                url: url,
                still_url: still_url
            };

            if (!still_url && !GiphyAPI.isGiphyUrl(url)) {
                GiphyAPI.uploadGet(name, url)
                    .then((data) => {
                        let updated = Object.assign({}, gif, data);

                        GifAPI.update(updated);
                        resolve(updated);
                    })
                    .catch((error) => {
                        console.error(error);

                        GifAPI.update(gif);
                        resolve(gif);
                    });

            } else if (!still_url && GiphyAPI.isGiphyUrl(url)) {
                let updated = Object.assign({}, gif, {
                    still_url: GiphyAPI.getStillFromUrl(url)
                });

                GifAPI.update(updated);
                resolve(updated);
            } else {
                GifAPI.update(gif);
                resolve(gif);
            }
        })
    };
};

export const update = (gif) => {
    return {
        type: GIF_UPDATE,
        payload: new Promise((resolve) => {
            GifAPI.update(gif);
            resolve(gif);
        })
    };
};

export const priority = (gif, inc) => {
    return {
        type: GIF_UPDATE,
        payload: new Promise((resolve) => {
            let priority = gif.priority,
                updated = Object.assign({}, gif, {
                    priority: priority += inc
                });

            GifAPI.update(updated);
            resolve(updated);
        })
    };
};

export const upload = (gif) => {
    return {
        type: GIF_UPLOAD,
        payload: new Promise((resolve, reject) => {
            if (!GiphyAPI.isGiphyUrl(gif.url)) {
                GiphyAPI.uploadGet(gif.name, gif.url)
                    .then((updates) => {
                        let updated = Object.assign({}, gif, updates);

                        GifAPI.update(updated);
                        resolve(updated);
                    })
                    .catch((error) => {
                        console.error(error);
                        reject(error);
                    });
            } else if (!gif.still_url && GiphyAPI.isGiphyUrl(gif.url)) {
                let updated = Object.assign({}, gif, {
                    still_url: GiphyAPI.getStillFromUrl(gif.url)
                })

                GifAPI.update(updated);
                resolve(updated);

                resolve();
            } else {
                resolve(gif);
            }
        })
    };
};

export const remove = (id) => {
    return {
        type: GIF_REMOVE,
        payload: new Promise((resolve) => {
            let data = GifAPI.get();

            GifAPI.updateAll(_.omit(data, [id]));
            resolve({
                id
            });
        })
    };
};