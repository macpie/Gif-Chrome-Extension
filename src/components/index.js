import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Copy from './common/Copy';
import Header from './header';
import './css/App.css';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="container-fluid">
                    <Copy />
                    <div className="row">
                        <Header
                            gifs={this.props.gifs}
                            goTo={this.props.goTo}
                            actions={this.props.actions} />
                    </div>
                    <div className="row">
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
};

export default App;