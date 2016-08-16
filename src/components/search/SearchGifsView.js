import React, {
    PropTypes
} from 'react';
import GifAddModal from '../common/GifAddModal';
import SearchGifView from './SearchGifView';

class SearchGifsView extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleMore = this.handleMore.bind(this);

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
    handleMore() {
        let pagination = this.props.pagination;

        if(pagination.total_count > pagination.offset) {
            this.props.handleMore();
        } else {
            console.log('no more');
        }
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
            <div>
                <div className="row">
                    <p onClick={this.handleMore}>Total count: {this.props.pagination.total_count}</p>
                    <p>Offset: {this.props.pagination.offset}</p>
                </div>
                <div id="searchGifsView" className="row">{gifLis}</div>
                <GifAddModal url={this.state.selected_url}/>
            </div>
        );
    }
};

SearchGifsView.propTypes = {
    gifs: PropTypes.array,
    pagination: PropTypes.object
};

export default SearchGifsView;