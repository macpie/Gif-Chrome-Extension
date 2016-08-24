import React from 'react';
import {
    IndexLink,
    browserHistory
} from 'react-router'
import GifStore from '../stores/GifStore';
import Copy from '../components/common/Copy'
import './css/App.css'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gifs_number: GifStore.size()
        };

        this.onStoreChange = this.onStoreChange.bind(this);
    }
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
            $('input.ctrl-f').focus();
        });

        GifStore.addChangeListener(this.onStoreChange);
    }
    componentWillUnmount() {
        GifStore.removeChangeListener(this.onStoreChange);
    }
    onStoreChange() {
        this.setState({
            gifs_number: GifStore.size()
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
                                <IndexLink activeClassName="active" to="/gifs">
                                    Gifs <span className="badge">{this.state.gifs_number}</span>
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
                    {this.props.children}
                </div>
            </div>
        );
    }
};

export default App;