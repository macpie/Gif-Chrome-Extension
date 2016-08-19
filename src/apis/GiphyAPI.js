import request from 'superagent';
import Promise from 'promise';
import {
    GIPHY_API_KEY
} from '../config';

export const isGiphyUrl = (url) => {
    return url.search('giphy.com') !== -1;
};

export const getStillFromUrl = (url) => {
    let a = url.split('.');

    a.splice(a.length - 2, 1, a[a.length - 2] + '_s');

    return a.join('.');
};

export const search = (req) => {
    return new Promise((resolve, reject) => {
        request
            .get('https://api.giphy.com/v1/gifs/search')
            .query({
                api_key: GIPHY_API_KEY,
                q: req.query,
                limit: req.limit || 10,
                offset: req.offset || 0
            })
            .end((err, res) => {
                if (err) reject(err);
                else resolve(res.body);
            });
    });
};

export const upload = (name, url) => {
    return new Promise((resolve, reject) => {
        request
            .post('https://api.giphy.com/v1/gifs')
            .send({
                api_key: GIPHY_API_KEY,
                source_image_url: url,
                tags: name.split(' ').join(',')
            })
            .end((err, res) => {
                if (err) reject(err);
                else resolve(res.body);
            });
    });
};