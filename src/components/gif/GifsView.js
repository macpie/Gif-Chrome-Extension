import React, {
    PropTypes
} from 'react';
import GifView from './GifView';

class GifsView extends React.Component {
    handleCopy(url) {
        $('#copy')
            .val(url)
            .select();

        document.execCommand('copy');
    }
    render() {
        let gifs = this.props.gifs,
            gifLis = [];

        gifs.forEach((gif) => {
            gifLis.push(<GifView key={gif.id} gif={gif} copy={this.handleCopy}/>);
        });

        return (
            <div id="gifs" className="row">{gifLis}</div>
        );
    }
};

GifsView.propTypes = {
    gifs: PropTypes.array.isRequired
};

export default GifsView;