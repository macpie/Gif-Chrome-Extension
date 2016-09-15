import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid, Row} from 'react-flexbox-grid/lib';
import Copy from './common/Copy';
import Header from './header';
import './css/App.css';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <Grid
                    fluid={true}
                    style={{
                        paddingLeft: 5,
                        paddingRight: 5
                    }}
                >
                    <Copy />
                    <Row>
                        <Header
                            gifs={this.props.gifs}
                            goTo={this.props.goTo}
                            actions={this.props.actions}
                            location={this.props.location}
                        />
                    </Row>
                    <Row>
                        {this.props.children}
                    </Row>
                </Grid>
            </MuiThemeProvider>
        );
    }
};

export default App;