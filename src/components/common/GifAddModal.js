import React, {
    PropTypes
} from 'react';
import * as _ from 'lodash';
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
            name: '',
            url: ''
        };
    }
    componentDidMount() {
        $('#GifAddModal').modal({
            show: false
        });

        $('#GifAddModal').on('hide.bs.modal', (e) => {
            this.setState({
                name: '',
                url: '',
                still_url: ''
            });
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.name || '',
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
                                    <input type="text" className="form-control" name="name" placeholder="Name" autoComplete="off" onChange={this.handleNameChange} value={this.state.name} />
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
    onSuccess: PropTypes.func.isRequired,
    name: PropTypes.string,
    url: PropTypes.string,
    still_url: PropTypes.string
};

export default GifAddModal;