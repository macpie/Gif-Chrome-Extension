import React from 'react';
import {
    Link
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
                                <Link activeStyle={activeStyle} to="/gifs">Gifs</Link>
                            </li>
                            <li role="presentation">
                                <Link activeStyle={activeStyle} to="/search">Search</Link>
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