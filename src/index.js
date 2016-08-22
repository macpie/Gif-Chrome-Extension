import React from 'react'
import {
    render
} from 'react-dom'
import {
    Router,
    Route,
    IndexRedirect,
    Redirect,
    browserHistory
} from 'react-router'
import App from './containers/App';
import Gif from './containers/Gif';
import Search from './containers/Search';
import Options from './containers/Options';
import * as GifAPI from './apis/GifAPI';
import * as GifActions from './actions/GifActions';

if(process.env.NODE_ENV === 'development') {
    GifAPI.mock(1);
}

GifActions.loadData();

// toastr setup
toastr.options.preventDuplicates = true; //eslint-disable-line no-undef
toastr.options.progressBar = true; //eslint-disable-line no-undef

const router = (
    <Router history={browserHistory}>
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