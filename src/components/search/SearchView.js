import React, {
    PropTypes
} from 'react';
import * as GiphyAPI from '../../apis/GiphyAPI';

class SearchView extends React.Component {
    componentWillMount() {
    }
    componentWillReceiveProps(nextProps) {
        GiphyAPI.search({
            query: nextProps.search
        });
    }
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