import React, {
    PropTypes
} from 'react';
import SearchGifView from './SearchGifView';

class SearchGifsRow extends React.Component {
    render() {
        let children = this.props.gifs.map((gif, i) => {
            return <SearchGifView key={gif.id} gif={gif} click={this.props.click} />
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