import * as _ from 'lodash'
import UUID from 'node-uuid';

const KEY = 'GIFS';

export const loadData = () => {
    let data = JSON.parse(localStorage.getItem(KEY));

    if (_.isEmpty(data)) {
        return {};
    } else {
        return data;
    }
};

export const update = (update) => {
    localStorage.setItem(KEY, JSON.stringify(update));
};

export const mock = (max = 10) => {
    localStorage.clear();

    let data = [];

    for(let i = 0; i < max; i++) {
        data.push({
            id: UUID.v4(),
            name: 'Test ' + i,
            url: 'http://i.imgur.com/y5x7n4m.gif'
        });
    }

    localStorage.setItem(KEY, JSON.stringify(data))
};