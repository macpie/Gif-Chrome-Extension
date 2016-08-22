import React, {
    PropTypes
} from 'react';

class UploadBtn extends React.Component {
    render() {
        return (
            <button type="button" className="btn btn-info" onClick={this.props.click}>
                <i className="fa fa-cloud-upload" aria-hidden="true"></i>
            </button>
        );
    }
};

UploadBtn.propTypes = {
    click: PropTypes.func.isRequired
};

export default UploadBtn;