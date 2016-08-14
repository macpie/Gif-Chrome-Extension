import * as _ from 'lodash'

const KEY = 'GIFS';

const getIndex = (id) => {
    let data = JSON.parse(localStorage.getItem(KEY));

    return _.findIndex(data, (gif) => {
        return gif.id === id;
    });
};

export const loadData = () => {
    let data = JSON.parse(localStorage.getItem(KEY));

    if (_.isEmpty(data)) {
        return {};
    } else {
        return data;
    }
};


export const add = (gif) => {
    let data = JSON.parse(localStorage.getItem(KEY));

    data.push(gif);

    localStorage.setItem(KEY, JSON.stringify(data));
};

export const remove = (id) => {
    let data = JSON.parse(localStorage.getItem(KEY)),
        index = getIndex(id);

    data.splice(index, 1);

    localStorage.setItem(KEY, JSON.stringify(data));
};

export const mock = () => {
    localStorage.clear();

    let data = [
        {
            id: '1',
            name: 'Au bucher!',
            url: 'http://i.imgur.com/y5x7n4m.gif'
        }
    ];

    localStorage.setItem(KEY, JSON.stringify(data))
};