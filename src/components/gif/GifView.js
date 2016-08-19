import React, {
    PropTypes
} from 'react';
import * as _ from 'lodash';
import * as Clipboard from '../../utils/Clipboard';
import * as GifActions from '../../actions/GifActions';
import DownloadLink from '../common/DownloadLink';
import '../../css/GifView.css'

class GifView extends React.Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);

        let gif = props.gif;

        this.state = Object.assign({}, gif, {
            img_url: gif.still_url || gif.url
        });
    }
    componentDidMount() {
        var gif = this.state;

        $('#' + gif.id).editable({
            selector: '.gif-name',
            container: 'body',
            type: 'text',
            mode: 'inline',
            showbuttons: false,
            success: function(resp, name) {
                GifActions.update(gif.id, name)
            }
        });
    }
    shouldComponentUpdate(props, state) {
        return !_.isEqual(this.state, state);
    }
    handleDelete() {
        GifActions.remove(this.state.id);
    }
    handleCopy() {
        Clipboard.copy(this.state.url);
    }
    handleMouseOver() {
        let gif = this.state;

        this.setState({
            img_url: gif.url
        });
    }
    handleMouseOut() {
        let gif = this.state;

        this.setState({
            img_url: gif.still_url || gif.url
        });
    }
    render() {
        let gif = this.state;

        return (
            <div className="col-xs-4 gif-view" id={gif.id} >
                <div className="thumbnail" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                    <div className="caption">
                        <h3 className="gif-name">{gif.name}</h3>
                        <div className="btn-group btn-group-sm" role="group">
                            <button type="button" className="btn btn-danger" onClick={this.handleDelete}>
                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                            <button type="button" className="btn btn-success" onClick={this.handleCopy}>
                                <i className="fa fa-files-o" aria-hidden="true"></i>
                            </button>
                            <DownloadLink url={gif.url} />
                        </div>
                    </div>
                    <img src={gif.img_url} alt={gif.name} />
                </div>
            </div>
        );
    }
};

GifView.propTypes = {
    gif: PropTypes.object.isRequired
};

export default GifView;