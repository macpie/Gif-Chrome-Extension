import React, {
    PropTypes
} from 'react';
import * as GifActions from '../../actions/GifActions';
import '../../css/GifsView.css'

class GifsView extends React.Component {
    handleDelete(id, e) {
        GifActions.remove(id);
    }
    handleCopy(url) {
        console.log(url);

        $('#copy')
            .val(url)
            .select();

        document.execCommand('copy');
    }
    render() {
        let gifs = this.props.gifs,
            gifLis = [];

        gifs.forEach((gif) => {
            gifLis.push(
                <div className="col-xs-4" key={gif.id}>
                    <div className="thumbnail">
                        <div className="caption">
                            <h3>{gif.name}</h3>
                            <div className="btn-group btn-group-sm" role="group">
                                <button type="button" className="btn btn-danger" onClick={this.handleDelete.bind(this, gif.id)}>X</button>
                                <button type="button" className="btn btn-success" onClick={this.handleCopy.bind(this, gif.url)}>C</button>
                                <button type="button" className="btn btn-warning">E</button>
                            </div>
                        </div>
                        <img src={gif.url} alt={gif.name}  />
                    </div>
                </div>

            );
        });

        return (
            <div id="gifs">
                <input id="copy" type="text" name="copy" />
                <div className="row">{gifLis}</div>
            </div>
        );
    }
};

GifsView.propTypes = {
    gifs: PropTypes.array.isRequired
};

export default GifsView;