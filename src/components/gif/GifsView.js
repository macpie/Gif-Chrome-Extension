import React, {
    PropTypes
} from 'react';
import * as GifActions from '../../actions/GifActions';

class GifsView extends React.Component {
    handleDelete(id) {
        GifActions.remove(id);
    }
    handleCopy(name) {
        console.log(name);

        $('#copy')
            .val(name)
            .select();

        document.execCommand('copy');
    }
    render() {
        let gifs = this.props.gifs,
            gifLis = [],
            copyStyle = {
                position: 'absolute',
                width: '10px',
                top: '-20px',
                left: '-20px',
            };

        gifs.forEach((gif) => {
            gifLis.push(
                <li key={gif.id}>
                    {gif.name}
                    <img src={gif.url} alt={gif.name} onClick={this.handleCopy.bind(this, gif.url)} />
                    <button type="button" onClick={this.handleDelete.bind(this, gif.id)}>X</button>
                </li>

            );
        });

        return (
            <div id="main">
                <input id="copy" type="text" name="copy" style={copyStyle} />
                <ul>{gifLis}</ul>
            </div>
        );
    }
};

GifsView.propTypes = {
    gifs: PropTypes.array.isRequired
};

export default GifsView;