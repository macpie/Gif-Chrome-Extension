import React, {
    PropTypes
} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import AppsIcon from 'material-ui/svg-icons/navigation/apps';

class Menu extends React.Component {
    render() {
        return (
            <IconMenu
                autoWidth={true}
                iconButtonElement={
                    <IconButton>
                        <AppsIcon color="white" />
                    </IconButton>
                }
                anchorOrigin={{
                    horizontal: 'left', vertical: 'bottom'
                }}
                onItemTouchTap={this.props.onSelect}
            >
                <MenuItem primaryText="Gifs " secondaryText={this.props.number} value="gifs" />
                <MenuItem primaryText="Search" value="search" />
                <MenuItem primaryText="Options"  value="options" />
            </IconMenu>
        );
    }
};

Menu.propTypes = {
    onSelect: PropTypes.func
};

export default Menu;