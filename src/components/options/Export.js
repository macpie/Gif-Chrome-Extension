import React, {
    PropTypes
} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Export extends React.Component {
    render() {
        let str = 'data:text/json;charset=utf-8,';

        str += encodeURIComponent(JSON.stringify(this.props.gifs, null, 4));

        return (
            <RaisedButton
                label="Download as JSON"
                primary={true}
                href={str}
                download="gifs.json"
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
    gifs: PropTypes.object.isRequired
};

export default Export;