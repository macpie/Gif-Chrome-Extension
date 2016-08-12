import React from 'react';
import {
    IndexLink
} from 'react-router'

class App extends React.Component {
    render() {
        const activeStyle = {
            color: '#fff',
            backgroundColor: '#337ab7'
        };

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <ul className="nav nav-pills nav-justified">
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