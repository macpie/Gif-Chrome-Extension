import React, {
    PropTypes
} from 'react';
import {
    browserHistory
} from 'react-router';
import * as _ from 'lodash';
import * as GifActions from '../../actions/GifActions';
import './css/GifAddModal.css';

class GifAddModal extends React.Component {
    static show() {
        $('#GifAddModal').modal('show');
    }
    static hide() {
        $('#GifAddModal').modal('hide');
    }
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = {
            url: ''
        };
    }
    componentDidMount() {
        $('#GifAddModal').modal({
            show: false
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            url: nextProps.url || '',
            still_url: nextProps.still_url
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
    handleSave(e) {
        let state = this.state,
            url = state.url,
            name = state.name,
            still_url = state.still_url;

        if (!_.isEmpty(url) && !_.isEmpty(name)) {
            GifActions.create(url, name, still_url);
            GifAddModal.hide();
            browserHistory.push('/gifs');
        } else {
            toastr.warning('Please provide a name and URL');
        }

    }
    render() {
        return (
            <div id="GifAddModal" className="modal fade" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">
                                    &times;
                                </span>
                            </button>
                            <h4 className="modal-title">
                                Add Gif
                            </h4>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="form-group">
                                    <input type="text" className="form-control" name="name" placeholder="Name" autoComplete="off" onChange={this.handleNameChange}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="url" placeholder="Url" autoComplete="off" onChange={this.handleUrlChange} value={this.state.url} />
                                </div>
                            </form>
                            <img src={this.state.url} className="img-thumbnail center-block" role="presentation" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">
                                Cancel
                            </button>
                            <button type="button" className="btn btn-success" onClick={this.handleSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

GifAddModal.propTypes = {
    url: PropTypes.string,
    still_url: PropTypes.string
};

export default GifAddModal;