import React from 'react'
import {
    render
} from 'react-dom'
import {
    Router,
    Route,
    IndexRedirect,
    Redirect,
    hashHistory
} from 'react-router'
import App from './containers/App';
import Gif from './containers/Gif';
import Search from './containers/Search';
import Options from './containers/Options';
import * as GifAPI from './apis/GifAPI';

GifAPI.mock();
GifAPI.loadData();

const router = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to='/gifs' />
            <Route path="gifs" component={Gif} />
            <Route path="search" component={Search} />
            <Route path="options" component={Options} />
            <Redirect from="*" to="/gifs" />
        </Route>
    </Router>
);

render(router, document.getElementById('root'));