import React from 'react';
import {
    Provider
} from 'react-redux';
import {
    render
} from 'react-dom';
import {
    Router,
    Route,
    IndexRedirect,
    Redirect,
    browserHistory
} from 'react-router';
import {
    syncHistoryWithStore
} from 'react-router-redux';
import Store from './stores';
import * as GifsActions from './actions/GifsActions';
import App from './containers/App';
import Gif from './containers/Gif';
import Search from './containers/Search';
// import Options from './containers/Options';
import * as GifAPI from './apis/GifAPI';

// toastr setup
toastr.options.preventDuplicates = true;
toastr.options.progressBar = true;

// NProgress setup
NProgress.configure({
    showSpinner: false
});

if (process.env.NODE_ENV === 'development') {
    GifAPI.mock(1);
}

const history = syncHistoryWithStore(browserHistory, Store);

Store.dispatch(GifsActions.get());

const router = (
    <Provider store={Store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRedirect to='/gifs' />
                <Route path="gifs" component={Gif} />
                <Route path="search" component={Search} />
                <Redirect from="*" to="/gifs" />
            </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById('root'));