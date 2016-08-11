import request from 'superagent';

const API_KEY = '5xtDarp1MN8nPb4X9vi';

export const search = (req) => {
    request
        .get('http://api.giphy.com/v1/gifs/search')
        .query({
            api_key: API_KEY,
            q: req.query,
            limit: req.limit || 10,
            offset: req.offset || 0
        })
        .end(function(err, res) {
            console.log(err, res);
        });
};