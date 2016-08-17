import React from 'react';
import {
    IndexLink
} from 'react-router'
import Copy from '../components/common/Copy'
import '../css/App.css'

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Copy />
                <div className="row">
                    <div className="col-xs-12">
                        <ul className="nav nav-pills">
                            <li role="presentation">
                                <IndexLink activeClassName="active" to="/gifs">Gifs</IndexLink>
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
                {this.props.children}
            </div>
        );
    }
};

export default App;