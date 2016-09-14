import React from 'react';
import IconButton from 'material-ui/IconButton';
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';

class UploadBtn extends React.Component {
    render() {
        return (
            <IconButton
                iconStyle={{color: "rgb(255, 64, 129)"}}
                tooltipPosition="bottom-center"
                tooltip="Upload to Giphy"
                children={<UploadIcon />}
                onClick={this.props.onClick}
            />
        );
    }
};

export default UploadBtn;