import React from 'react';
import * as GifActions from '../../actions/GifActions';
import '../../css/GifFilter.css'

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
                <form>
                    <input type="text" name="filter" placeholder="Filter by name" onChange={this.handleFilterChange} />
                </form>
            </div>
        );
    }
};

export default GifFilter;