import React from 'react';
import * as _ from 'lodash';
import AppBar from 'material-ui/AppBar';
import Menu from './Menu';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.handleMenuSelect = this.handleMenuSelect.bind(this);

        this.state = {
            title: 'Gifs'
        };
    }
    handleMenuSelect(ev, item) {
        this.props.goTo(item.props.value);

        this.setState({
            title: _.capitalize(item.props.value)
        });
    }
    render() {
        return (
            <div className="col-xs-12">
                <AppBar
                    title={this.state.title}
                    iconElementLeft={<Menu onSelect={this.handleMenuSelect} />}
                />
            </div>
        );
    }
};

export default Header;