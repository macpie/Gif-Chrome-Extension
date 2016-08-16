import React, {
    PropTypes
} from 'react';
import GifAddModal from '../common/GifAddModal';
import SearchGifView from './SearchGifView';

class SearchGifsView extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            selected_url: ''
        };
    }
    handleClick(gif) {
        this.setState({
            selected_url: gif.images.downsized_medium.url
        });

        $('#GifAddModal').modal('show');
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
                <GifAddModal url={this.state.selected_url}/>
            </div>
        );
    }
};

SearchGifsView.propTypes = {
    gifs: PropTypes.array
};

export default SearchGifsView;