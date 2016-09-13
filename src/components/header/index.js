import React, {
    PropTypes
} from 'react';
import * as _ from 'lodash';
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
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            title: 'Gifs',
            showModal: false
        };
    }
    handleMenuSelect(ev, item) {
        this.props.goTo(item.props.value);

        this.setState({
            title: _.capitalize(item.props.value)
        });
    }
    openModal() {
        this.setState({
            showModal: true
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
        return (
            <div className="col-xs-12">
                <AppBar
                    title={this.state.title}
                    iconElementLeft={<Menu onSelect={this.handleMenuSelect} />}
                    iconElementRight={<IconButton onClick={this.openModal}><AddIcon /></IconButton>}
                />
                <GifAddModal open={this.state.showModal} onSuccess={this.handleAdd}/>
            </div>
        );
    }
};

Header.propTypes = {
    goTo: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
};

export default Header;