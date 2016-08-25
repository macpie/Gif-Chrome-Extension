import request from 'superagent';
import Promise from 'promise';
import {
    GIPHY_SEARCH_API_KEY,
    GIPHY_UPLOAD_API_KEY
} from '../config';

export const isGiphyUrl = (url) => {
    return url.search('giphy.com') !== -1;
};

export const getStillFromUrl = (url) => {
    let a = url.split('.');

    a.splice(a.length - 2, 1, a[a.length - 2] + '_s');

    return a.join('.');
};

export const get = (id) => {
    NProgress.start();

    return new Promise((resolve, reject) => {
        request
            .get('http://api.giphy.com/v1/gifs/' + id)
            .query({
                api_key: GIPHY_SEARCH_API_KEY
            })
            .end((err, res) => {
                NProgress.done();

                if (err) {
                    reject(err);
                } else if (res.body.meta && res.body.meta.status !== 200) {
                    reject(res.body.meta);
                } else {
                    resolve(res.body);
                }
            });
    });
};

export const search = (req) => {
    NProgress.start();

    return new Promise((resolve, reject) => {
        request
            .get('http://api.giphy.com/v1/gifs/search')
            .query({
                api_key: GIPHY_SEARCH_API_KEY,
                q: req.query,
                limit: req.limit || 10,
                offset: req.offset || 0
            })
            .end((err, res) => {
                NProgress.done();

                if (err) {
                    reject(err);
                } else if (res.body.meta && res.body.meta.status !== 200) {
                    reject(res.body.meta);
                } else {
                    resolve(res.body);
                }
            });
    });
};

export const upload = (name, url) => {
    NProgress.start();

    return new Promise((resolve, reject) => {
        request
            .post('http://upload.giphy.com/v1/gifs')
            .query({
                api_key: GIPHY_UPLOAD_API_KEY,
                source_image_url: encodeURI(url),
                tags: name.split(' ').join(',')
            })
            .end((err, res) => {
                NProgress.done();

                if (err) {
                    reject(err);
                } else if (res.body.meta && res.body.meta.status !== 200) {
                    reject(res.body.meta);
                } else {
                    resolve(res.body);
                }
            });
    });
};