import React, {
    PropTypes
} from 'react';
import * as _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardMedia} from 'material-ui/Card';

class GifAddModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            name: '',
            url: props.url
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.name || '',
            url: nextProps.url || '',
            stillUrl: nextProps.stillUrl
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
                this.state.stillUrl
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
                onTouchTap={this.props.onCancel}
                style={{margin: 10}}
            />,
            <RaisedButton
                label="Add"
                primary={true}
                onTouchTap={this.handleAdd}
                style={{margin: 10}}
            />
        ];

        let style = {};

        if(!this.state.url) {
            style.display = "none";
        }

        return (
            <Dialog
                id="GifAddModal"
                title="Add Gif"
                actions={actions}
                modal={false}
                open={this.props.open}
                repositionOnUpdate={false}
                autoScrollBodyContent={true}
                onRequestClose={this.props.onCancel}
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
                />
                <TextField
                    hintText="http://media2.giphy.com/media/geozuBY5Y6cXm/giphy.gif"
                    floatingLabelText="Url"
                    fullWidth={true}
                    autoComplete="off"
                    onChange={this.handleUrlChange}
                    value={this.state.url}
                />
                <Card style={style}>
                    <CardMedia>
                        <img src={this.state.url} role="presentation" />
                    </CardMedia>
                </Card>
            </Dialog>
        );
    }
};

GifAddModal.propTypes = {
    open: PropTypes.bool.isRequired,
    name: PropTypes.string,
    url: PropTypes.string,
    stillUrl: PropTypes.string,
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default GifAddModal;