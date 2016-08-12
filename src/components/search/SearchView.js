import React, {
    PropTypes
} from 'react';
import GifAddModal from '../common/GifAddModal';

class SearchView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected_url: ''
        };
    }
    openModal(url) {
        this.setState({
            selected_url: url
        });
        $('#GifAddModal').modal('show');
    }
    render() {
        let gifLis = [],
            gifs = this.props.gifs;

        gifs.forEach((gif) => {
            gifLis.push(
                <li key={gif.id}>
                    <img src={gif.images.original_still.url} role="presentation" onClick={this.openModal.bind(this, gif.images.downsized_medium.url)} />
                </li>

            );
        });

        return (
            <div>
                <ul>{gifLis}</ul>
                <GifAddModal url={this.state.selected_url} />
            </div>
        );
    }
};

SearchView.propTypes = {
    gifs: PropTypes.array
};

export default SearchView;