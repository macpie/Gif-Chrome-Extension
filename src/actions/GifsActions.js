import Promise from 'promise';
import {
    GIFS_GET,
    GIFS_IMPORT,
    GIFS_RESET_PRIORITY
} from '../constants/Gif';
import * as GifAPI from '../apis/GifAPI';

export const get = () => {
    return {
        type: GIFS_GET,
        payload: new Promise((resolve) => {
            let data = GifAPI.get();

            resolve(data);
        })
    };
};

export const importData = (data) => {
    return {
        type: GIFS_IMPORT,
        payload: new Promise((resolve) => {
            GifAPI.updateAll(data);
            resolve(data);
        })
    };
};

export const reset_priority = (data) => {
    return {
        type: GIFS_RESET_PRIORITY,
        payload: new Promise((resolve) => {
            let data = GifAPI.get(),
                updated = data.map((gif) => {
                    return Object.assign({}, gif, {
                        priority: 0
                    });
                })

            GifAPI.updateAll(updated);
            resolve(updated);
        })
    };
};