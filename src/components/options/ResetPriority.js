import React, {
    PropTypes
} from 'react';

class Export extends React.Component {
    render() {
        return (
            <button className="btn btn-danger" onClick={this.props.reset}>
                Reset Priorities
            </button>
        );
    }
};

Export.propTypes = {
    reset: PropTypes.func.isRequired
};

export default Export;