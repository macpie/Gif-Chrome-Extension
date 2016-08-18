import React, {
    PropTypes
} from 'react';
import SearchGifView from './SearchGifView';

class SearchGifsRow extends React.Component {
    render() {
        let children = this.props.children.map((obj, i) => {
            return (<SearchGifView key={i} gif={obj} click={this.props.click} />);
        });

        return (
            <div className="row">
                {children}
            </div>
        );
    }
};

SearchGifsRow.propTypes = {
    click: PropTypes.func.isRequired
};

export default SearchGifsRow;