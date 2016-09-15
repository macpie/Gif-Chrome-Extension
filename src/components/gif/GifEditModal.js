import React, {
    PropTypes
} from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as GiphyAPI from '../../apis/GiphyAPI';
import DownloadLink from '../common/DownloadLink';
import UploadBtn from '../common/UploadBtn';

class GifEditModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);

        this.state = {
            open: props.open,
            gif: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            gif: nextProps.gif
        });
    }
    handleClose() {
        this.setState({
            open: false
        });
    }
    handleNameChange(e) {
        this.setState({
            gif: Object.assign({}, this.state.gif, {
                name: e.target.value
            })
        });
    }
    render() {
        const actions = [
            <RaisedButton
                label="Delete"
                secondary={true}
                style={{margin: 5}}
                onClick={() => {
                    this.props.onDelete(this.state.gif);
                }}
            />,
            <RaisedButton
                label="Cancel"
                style={{margin: 5}}
                onClick={this.handleClose}
            />,
            <RaisedButton
                label="Save"
                primary={true}
                style={{margin: 5}}
                onClick={() => {
                    this.props.onSave(this.state.gif);
                }}
            />
        ],
        maybeAddUploadBtn = () => {
            if (this.state.gif.url && !GiphyAPI.isGiphyUrl(this.state.gif.url)) {
                return (
                    <UploadBtn onClick={() => {
                        this.props.onUpload(this.state.gif);
                    }} />
                );
            }
        };

        return (
            <Dialog
                id="GifEditModal"
                title={"Edit \"" + this.props.gif.name + "\""}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                repositionOnUpdate={false}
                style={{
                    paddingTop: "15px"
                }} >

                <TextField
                  hintText={this.props.gif.name}
                  floatingLabelText="Name"
                  fullWidth={true}
                  autoComplete="off"
                  style={{marginBottom: 5}}
                  value={this.state.gif.name}
                  onChange={this.handleNameChange}
                />
                <div style={{textAlign: "center"}}>
                    <DownloadLink gif={this.state.gif}/>
                    {maybeAddUploadBtn()}
                </div>
            </Dialog>
        );
    }
};

GifEditModal.propTypes = {
    open: PropTypes.bool.isRequired,
    gif: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
};

export default GifEditModal;