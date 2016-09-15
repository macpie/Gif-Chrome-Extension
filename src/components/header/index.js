import React, {
    PropTypes
} from 'react';
import * as _ from 'lodash';
import {Col} from 'react-flexbox-grid/lib';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import Menu from './Menu';
import GifAddModal from '../common/GifAddModal';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.handleMenuSelect = this.handleMenuSelect.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            showModal: false
        };
    }
    handleMenuSelect(ev, item) {
        this.props.goTo(item.props.value);
    }
    openModal() {
        this.setState({
            showModal: true
        });
    }
    closeModal() {
        this.setState({
            showModal: false
        });
    }
    handleAdd(name, url, still_url) {
        this.props.actions.create(name, url, still_url);

        this.setState({
            showModal: false
        });

        this.props.goTo('/gifs');
    }
    render() {
        const title = this.props.location.pathname;

        return (
            <Col xs={12}>
                <AppBar
                    title={
                        _.capitalize(title.replace(/\//, ''))
                    }
                    iconElementLeft={<Menu onSelect={this.handleMenuSelect} />}
                    iconElementRight={<IconButton onClick={this.openModal}><AddIcon /></IconButton>}
                />
                <GifAddModal
                    open={this.state.showModal}
                    onSuccess={this.handleAdd}
                    onCancel={this.closeModal}
                />
            </Col>
        );
    }
};

Header.propTypes = {
    goTo: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default Header;