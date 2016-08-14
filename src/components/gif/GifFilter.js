import React from 'react';
import * as GifActions from '../../actions/GifActions';


class GifFilter extends React.Component {
    constructor(props) {
        super(props);

        this.handleFilterChange = this.handleFilterChange.bind(this);
    }
    handleFilterChange(e) {
        GifActions.filter(e.target.value);
    }
    render() {
        return (
            <div id="filter" className="row">
                <div className="col-xs-6 col-xs-offset-3">
                    <input type="text" name="filter" className="form-control" placeholder="Filter by name" onChange={this.handleFilterChange} />
                </div>
            </div>
        );
    }
};

export default GifFilter;