import Promise from 'promise';
import {
    GIFS_GET,
    GIFS_IMPORT
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

export const import_data = (data) => {
    return {
        type: GIFS_IMPORT,
        payload: new Promise((resolve) => {
            GifAPI.updateAll(data);
            resolve(data);
        })
    };
};