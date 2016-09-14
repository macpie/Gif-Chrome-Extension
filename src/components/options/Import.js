import React, {
    PropTypes
} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Import extends React.Component {
    constructor(props) {
        super(props);

        this.handleImport = this.handleImport.bind(this);
    }
    handleImport(e) {
        var self = this,
            reader = new FileReader();

        reader.readAsText(e.target.files[0], 'UTF-8');
        reader.onload = function(evt) {
            try {
                let data = JSON.parse(evt.target.result)

                self.props.onSuccess(data);
            } catch(err) {
                console.error(err);
                self.props.onFailure();
            }
        };
    }
    render() {
        return (
            <RaisedButton
                label="Import"
                primary={true}
                containerElement='label'
                fullWidth={true}
                style={{
                    marginTop: 10,
                    marginBottom: 10
                }}
            >
                <input type="file" onChange={this.handleImport} style={{display: 'none'}} />
            </RaisedButton>
        );
    }
};

Import.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func.isRequired
};

export default Import;