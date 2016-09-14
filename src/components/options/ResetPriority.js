import React, {
    PropTypes
} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Export extends React.Component {
    render() {
        return (
            <RaisedButton
                label="Reset Priorities"
                secondary={true}
                onClick={this.props.reset}
                fullWidth={true}
                style={{
                    marginTop: 10,
                    marginBottom: 10
                }}
            />
        );
    }
};

Export.propTypes = {
    reset: PropTypes.func.isRequired
};

export default Export;