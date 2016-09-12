import React, {
    PropTypes
} from 'react';

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
            <label className="btn btn-primary btn-file">
                Import <input type="file" onChange={this.handleImport} style={{display: 'none'}} />
            </label>
        );
    }
};

Import.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func.isRequired
};

export default Import;