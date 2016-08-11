import React from 'react'
import {
    render
} from 'react-dom'
import {
    Router,
    Route,
    IndexRoute,
    hashHistory
} from 'react-router'
import App from './containers/App';
import Gif from './containers/Gif';
import Search from './containers/Search';
import * as GifAPI from './apis/GifAPI';

GifAPI.mock();
GifAPI.loadData();

const router = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Gif} />
            <Route path="/gifs" component={Gif} />
            <Route path="/search" component={Search} />
            <Route path="*" component={Gif} />
        </Route>
    </Router>
);

render(router, document.getElementById('root'));