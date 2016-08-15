import React, {
    PropTypes
} from 'react';
import * as GifActions from '../../actions/GifActions';
import DownloadLink from '../common/DownloadLink';
import '../../css/GifView.css'

class GifView extends React.Component {
    componentDidMount() {
        var gif = this.props.gif;

        $('#' + gif.id).editable({
            selector: '.gif-name',
            container: 'body',
            type: 'text',
            mode: 'inline',
            showbuttons: false,
            success: function(resp, name) {
                GifActions.update(gif.id, gif.url, name)
            }
        });
    }
    handleDelete(id, e) {
        GifActions.remove(id);
    }
    handleCopy(url) {
        this.props.copy(url);
    }
    render() {
        let gif = this.props.gif;

        return (
            <div className="col-xs-4 gif" id={gif.id}>
                <div className="thumbnail">
                    <div className="caption">
                        <h3 className="gif-name">{gif.name}</h3>
                        <div className="btn-group btn-group-sm" role="group">
                            <button type="button" className="btn btn-danger" onClick={this.handleDelete.bind(this, gif.id)}>
                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                            <button type="button" className="btn btn-success" onClick={this.handleCopy.bind(this, gif.url)}>
                                <i className="fa fa-files-o" aria-hidden="true"></i>
                            </button>
                            <DownloadLink url={gif.url} />
                        </div>
                    </div>
                    <img src={gif.url} alt={gif.name} />
                </div>
            </div>
        );
    }
};

GifView.propTypes = {
    gif: PropTypes.object.isRequired,
    copy: PropTypes.func.isRequired
};

export default GifView;