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
            <form id="filter">
                <input type="text" name="filter" placeholder="Filter by name" onChange={this.handleFilterChange} />
            </form>
        );
    }
};

export default GifFilter;