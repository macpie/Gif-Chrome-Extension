import * as _ from 'lodash'

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

export const mock = () => {
    localStorage.clear();

    let data = [
        {
            id: '1',
            name: 'Test 1',
            url: 'http://i.imgur.com/y5x7n4m.gif'
        },
        {
            id: '2',
            name: 'Test 22222222222222222222',
            url: 'http://i.imgur.com/BjJyQIc.gif'
        },
        {
            id: '3',
            name: 'Test 3',
            url: 'http://i.imgur.com/AKUf1yY.gif'
        },
        {
            id: '5',
            name: 'Test 5',
            url: 'http://i.imgur.com/y5x7n4m.gif'
        }
    ];

    localStorage.setItem(KEY, JSON.stringify(data))
};