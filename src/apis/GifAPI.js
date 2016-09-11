import * as _ from 'lodash'
import UUID from 'node-uuid';

let KEY = 'GIFS';

if (process.env.NODE_ENV === 'development') {
    KEY = 'GIFS_TEST';
}

export const get = () => {
    let data = JSON.parse(localStorage.getItem(KEY));

    if (_.isEmpty(data)) {
        return {};
    } else {
        return data;
    }
};

export const updateAll = (update) => {
    localStorage.setItem(KEY, JSON.stringify(update));
};

export const update = (update) => {
    let data = get();

    localStorage.setItem(
        KEY,
        JSON.stringify(
            Object.assign({}, data, {
                [update.id]: update
            })
        )
    );
};

export const mock = (max = 10) => {
    localStorage.removeItem(KEY);

    let data = {};

    for (let i = 0; i < max; i++) {
        let id = UUID.v4();

        data[id] = {
            id: id,
            name: 'Test ' + i,
            url: 'http://media2.giphy.com/media/geozuBY5Y6cXm/giphy.gif',
            still_url: 'https://media2.giphy.com/media/geozuBY5Y6cXm/giphy_s.gif',
            priority: _.random(0, 100)
        };
    }

    localStorage.setItem(KEY, JSON.stringify(data));
};