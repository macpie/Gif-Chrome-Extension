import request from 'superagent';
import Promise from 'promise';
import {GIPHY_API_KEY} from '../config';

export const search = (req) => {
    return new Promise((resolve, reject) => {
        request
            .get('http://api.giphy.com/v1/gifs/search')
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