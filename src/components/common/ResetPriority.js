import React from 'react';
import * as GifActions from '../../actions/GifActions';

class Export extends React.Component {
    constructor(props) {
        super(props);

        this.handleReset = this.handleReset.bind(this);
    }
    handleReset(e) {
        GifActions.resetPriority();
    }
    render() {
        return (
            <button className="btn btn-danger" onClick={this.handleReset}>
                Reset Priorities
            </button>
        );
    }
};

export default Export;