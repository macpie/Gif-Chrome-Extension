import React from 'react';
import GifAddModal from '../common/GifAddModal'
import * as GifActions from '../../actions/GifActions';

class GifFilter extends React.Component {
    constructor(props) {
        super(props);

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }
    handleFilterChange(e) {
        GifActions.filter(e.target.value);
    }
    handleAdd() {
        $('#GifAddModal').modal('show');
    }
    render() {
        return (
            <div id="filter" className="row">
                <div className="col-xs-6 col-xs-offset-3">
                    <div className="input-group">
                        <input type="text" name="filter" className="form-control" placeholder="Filter by name" onChange={this.handleFilterChange} />
                        <div className="input-group-btn">
                            <button className="btn btn-default" onClick={this.handleAdd}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <GifAddModal />
            </div>
        );
    }
};

export default GifFilter;