import React from 'react';

class Export extends React.Component {
    constructor(props) {
        super(props);

        this.handleImport = this.handleImport.bind(this);
    }
    handleImport(e) {
        var reader = new FileReader(),
            onSuccess = this.props.onSuccess,
            onFailure = this.props.onFailure;

        reader.readAsText(e.target.files[0], 'UTF-8');
        reader.onload = function(evt) {
            try {
                let data = JSON.parse(evt.target.result)

                if(onSuccess) onSuccess(data);
            } catch(err) {
                if(onFailure) onFailure();
            }
        };
    }
    render() {
        return (
            <input type="file" id="input" onChange={this.handleImport} />
        );
    }
};

export default Export;