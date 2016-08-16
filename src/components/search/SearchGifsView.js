import React, {
    PropTypes
} from 'react';
import GifAddModal from '../common/GifAddModal';
import SearchGifView from './SearchGifView';

class SearchGifsView extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(gif) {
        console.log(gif);
    }
    render() {
        let gifLis = [],
            gifs = this.props.gifs;

        gifs.forEach((gif) => {
            gifLis.push(
                <SearchGifView key={gif.id} gif={gif} click={this.handleClick} />
            );
        });

        return (
            <div className="row">
                <div id="searchGifsView" className="row">{gifLis}</div>
                <GifAddModal />
            </div>
        );
    }
};

SearchGifsView.propTypes = {
    gifs: PropTypes.array
};

export default SearchGifsView;