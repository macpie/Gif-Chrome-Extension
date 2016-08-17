import React, {
    PropTypes
} from 'react';
import * as GifActions from '../../actions/GifActions';
import DownloadLink from '../common/DownloadLink';
import '../../css/GifView.css'

class GifView extends React.Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleCopy = this.handleCopy.bind(this);

        this.state = {};
    }
    componentWillMount() {
        var gif = this.props.gif;

        this.setState(gif);
    }
    componentDidMount() {
        var gif = this.state

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
    handleDelete() {
        GifActions.remove(this.state.id);
    }
    handleCopy() {
        this.props.copy(this.state.url);
    }
    render() {
        let gif = this.state;

        return (
            <div className="col-xs-4 gif-view" id={gif.id}>
                <div className="thumbnail">
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