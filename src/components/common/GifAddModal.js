import React, {
    PropTypes
} from 'react';
import {
    browserHistory
} from 'react-router'
import * as GifActions from '../../actions/GifActions';

class GifAddModal extends React.Component {
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
            url: nextProps.url || ''
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
        GifActions.create(this.state.url, this.state.name);
        $('#GifAddModal').modal('hide');
        browserHistory.push('/gifs');
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
                            <form id="add">
                                <input type="text" name="name" placeholder="Name" onChange={this.handleNameChange}/>
                                <input type="text" name="url" placeholder="Url" onChange={this.handleUrlChange} value={this.state.url} />
                                 <img src={this.state.url} role="presentation" />
                            </form>
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
    url: PropTypes.string
};

export default GifAddModal;