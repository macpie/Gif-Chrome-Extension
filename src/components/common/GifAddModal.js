import React, {
    PropTypes
} from 'react';
import * as _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './css/GifAddModal.css';

class GifAddModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            open: props.open,
            name: '',
            url: props.url
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            name: nextProps.name || '',
            url: nextProps.url || '',
            still_url: nextProps.still_url
        });
    }
    handleClose() {
        this.setState({
            open: false
        });
    }
    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }
    handleUrlChange(e) {
        this.setState({
            url: e.target.value
        });
    }
    handleAdd() {
        if (!_.isEmpty(this.state.url) && !_.isEmpty(this.state.name)) {
            this.props.onSuccess(
                this.state.name,
                this.state.url,
                this.state.still_url
            );
        } else {
            toastr.warning('Please provide a name and URL');
        }
    }
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
                style={{margin: 10}}
            />,
            <RaisedButton
                label="Add"
                primary={true}
                onTouchTap={this.handleAdd}
                style={{margin: 10}}
            />
        ];

        return (
            <Dialog
                id="GifAddModal"
                title="Add Gif"
                actions={actions}
                modal={true}
                open={this.state.open}
                repositionOnUpdate={false}
                style={{
                    paddingTop: "15px"
                }} >

                <TextField
                  hintText="Test Name"
                  floatingLabelText="Name"
                  fullWidth={true}
                  autoComplete="off"
                  onChange={this.handleNameChange}
                  value={this.state.name}
                  style={{marginBottom: 5}}
                />
                <TextField
                  hintText="http://media2.giphy.com/media/geozuBY5Y6cXm/giphy.gif"
                  floatingLabelText="Url"
                  fullWidth={true}
                  autoComplete="off"
                  onChange={this.handleUrlChange}
                  value={this.state.url}
                  style={{marginBottom: 5}}
                />
                <img src={this.state.url} className="img-thumbnail center-block" role="presentation" />
            </Dialog>
        );
    }
};

GifAddModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onSuccess: PropTypes.func.isRequired,
    name: PropTypes.string,
    url: PropTypes.string,
    still_url: PropTypes.string
};

export default GifAddModal;