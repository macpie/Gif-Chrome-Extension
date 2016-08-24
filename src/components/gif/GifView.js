import React, {
    PropTypes
} from 'react';
import * as GiphyAPI from '../../apis/GiphyAPI';
import DownloadLink from '../common/DownloadLink';
import UploadBtn from '../common/UploadBtn';
import './css/GifView.css'

class GifView extends React.Component {
    constructor(props) {
        super(props);

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);

        this.state = Object.assign({}, props.gif, {
            img_url: props.gif.still_url || props.gif.url
        });
    }
    componentDidMount() {
        var self = this,
            gif = this.state;

        $('#' + gif.id).editable({
            selector: '.gif-name',
            container: 'body',
            type: 'text',
            mode: 'inline',
            showbuttons: false,
            success: function(resp, name) {
                self.props.edit(gif, name);
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        let nextGif = nextProps.gif,
            newState = Object.assign({}, nextGif, {
                img_url: nextGif.still_url || nextGif.url
            });

        this.setState(newState);
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

        const maybeAddUploadBtn = () => {
            if (!GiphyAPI.isGiphyUrl(gif.url)) {
                return (
                    <UploadBtn click={()=>{this.props.upload(gif)}} />
                );
            }
        };

        return (
            <div className="col-xs-4 gif-view" id={gif.id} >
                <div className="thumbnail" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                    <div className="caption">
                        <h3 className="gif-name">{gif.name}</h3>
                        <div className="btn-group btn-group-sm" role="group">
                            <button type="button" className="btn btn-danger" onClick={()=>{this.props.delete(gif)}}>
                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                            <button type="button" className="btn btn-success" onClick={()=>{this.props.copy(gif)}}>
                                <i className="fa fa-files-o" aria-hidden="true"></i>
                            </button>
                            <DownloadLink gif={gif} callback={()=>{this.props.download(gif)}}/>
                            {maybeAddUploadBtn()}
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