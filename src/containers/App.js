import React from 'react';
import {
    IndexLink,
    browserHistory
} from 'react-router'
import Copy from '../components/common/Copy'
import '../css/App.css'

class App extends React.Component {
    componentDidMount() {
        Mousetrap.bind('command+1', function(e) { //eslint-disable-line no-undef
            browserHistory.push('/gifs');
        });

        Mousetrap.bind('command+2', function(e) { //eslint-disable-line no-undef
            browserHistory.push('/search');
        });

        Mousetrap.bind('command+3', function(e) { //eslint-disable-line no-undef
            browserHistory.push('/options');
        });

        Mousetrap.bind('ctrl+f', function(e) { //eslint-disable-line no-undef
            console.log($('input.ctrl-f').focus());
        });

    }
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
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        );
    }
};

export default App;