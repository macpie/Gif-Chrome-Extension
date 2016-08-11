import React, {
    PropTypes
} from 'react';

class SearchView extends React.Component {
    render() {
        return (
            <h3>{this.props.search}</h3>
        );
    }
};

SearchView.propTypes = {
    search: PropTypes.string.isRequired
};

export default SearchView;