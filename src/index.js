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
import injectTapEventPlugin from 'react-tap-event-plugin';
import Store from './stores';
import * as GifsActions from './actions/GifsActions';
import App from './containers/App';
import Gif from './containers/Gif';
import Search from './containers/Search';
import Options from './containers/Options';
import * as GifAPI from './apis/GifAPI';

toastr.options = {
    preventDuplicates: true,
    progressBar: true,
    newestOnTop: true
};

NProgress.configure({
    showSpinner: false
});

injectTapEventPlugin();

if (process.env.NODE_ENV === 'development') {
    GifAPI.mock(100);
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
                <Route path="options" component={Options} />
                <Redirect from="*" to="/gifs" />
            </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById('root'));