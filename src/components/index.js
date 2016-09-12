import React from 'react';
import {
    IndexLink
} from 'react-router';
import * as _ from 'lodash';
import Copy from './common/Copy';
import './css/App.css';

class App extends React.Component {
    render() {
        const {
            gifs,
            children
        } = this.props;

        let keys = _.keys(gifs);
        return (
            <div className="container-fluid">
                <Copy />
                <div className="row">
                    <div className="col-xs-12">
                        <ul className="nav nav-pills">
                            <li role="presentation">
                                <IndexLink activeClassName="active" to="/gifs">
                                    Gifs <span className="badge">{keys.length}</span>
                                </IndexLink>
                            </li>
                            <li role="presentation">
                                <IndexLink activeClassName="active" to="/search">Search</IndexLink>
                            </li>
                            <li role="presentation">
                                <IndexLink activeClassName="active" to="/options">Options</IndexLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    {children}
                </div>
            </div>
        );
    }
};

export default App;