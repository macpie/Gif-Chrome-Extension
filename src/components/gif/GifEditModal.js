import React, {
    PropTypes
} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
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
            <FlatButton
                label="Cancel"
                style={{margin: 5}}
                onTouchTap={this.handleClose}
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
                modal={true}
                open={this.state.open}
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
                    <IconButton
                        iconStyle={{color: "red"}}
                        tooltipPosition="bottom-center"
                        tooltip="Delete"
                        children={<DeleteIcon />}
                        onClick={() => {
                            this.props.onDelete(this.state.gif);
                        }}
                    />
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