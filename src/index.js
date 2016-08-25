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

// toastr setup
toastr.options.preventDuplicates = true;
toastr.options.progressBar = true;

// NProgress setup
NProgress.configure({
    showSpinner: false
});

if (process.env.NODE_ENV === 'development') {
    GifAPI.mock(100);
}

GifActions.loadData();

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