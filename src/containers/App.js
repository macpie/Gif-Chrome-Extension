import React from 'react';
import {
    IndexLink
} from 'react-router'
import '../css/App.css'

class App extends React.Component {
    render() {
        const activeStyle = {
            color: '#fff',
            backgroundColor: '#337ab7'
        };

        return (
            <div className="container-fluid">
                <input id="copy" type="text" name="copy" />
                <div className="row">
                    <div className="col-xs-12">
                        <ul className="nav nav-pills">
                            <li role="presentation">
                                <IndexLink activeStyle={activeStyle} to="/gifs">Gifs</IndexLink>
                            </li>
                            <li role="presentation">
                                <IndexLink activeStyle={activeStyle} to="/search">Search</IndexLink>
                            </li>
                            <li role="presentation">
                                <IndexLink activeStyle={activeStyle} to="/options">Options</IndexLink>
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