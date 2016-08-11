import React from 'react'
import {
    render
} from 'react-dom'
import {
    Router,
    Route,
    hashHistory
} from 'react-router'
import GifApp from './containers/GifApp';
import * as GifAPI from './apis/GifAPI';

GifAPI.mock();
GifAPI.loadData();

const router = (
    <Router history={hashHistory}>
        <Route path="/" component={GifApp}>
            <Route path="*" component={GifApp} />
        </Route>
    </Router>
);

render(router, document.getElementById('root'));