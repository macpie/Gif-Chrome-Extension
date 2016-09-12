import Promise from 'promise';
import {
    FILTER,
} from '../constants/Filter';

export const filter = (text) => {
    return {
        type: FILTER,
        payload: new Promise((resolve) => {
            resolve(text);
        })
    };
};