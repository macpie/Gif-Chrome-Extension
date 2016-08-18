import React, {
    PropTypes
} from 'react';
import GifView from './GifView';

class GifsView extends React.Component {
    render() {
        let gifs = this.props.gifs,
            gifLis = [];

        gifs.forEach((gif) => {
            gifLis.push(<GifView key={gif.id} gif={gif} />);
        });

        return (
            <div id="gifsView">{gifLis}</div>
        );
    }
};

GifsView.propTypes = {
    gifs: PropTypes.array.isRequired
};

export default GifsView;