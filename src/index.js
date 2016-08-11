import React from 'react'
import {
    render
} from 'react-dom'
import GifApp from './containers/GifApp';
import * as GifAPI from './apis/GifAPI';

GifAPI.mock();
GifAPI.loadData();

render(
    <GifApp />,
    document.getElementById('root')
);