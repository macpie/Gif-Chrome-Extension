import React from 'react'
import {
    render
} from 'react-dom'
import {
    Router,
    Route,
    hashHistory
} from 'react-router'
import Gif from './containers/Gif';
import Search from './containers/Search';
import * as GifAPI from './apis/GifAPI';

GifAPI.mock();
GifAPI.loadData();

const router = (
    <Router history={hashHistory}>
        <Route path="/search" component={Search} />
        <Route path="*" component={Gif} />
    </Router>
);

render(router, document.getElementById('root'));