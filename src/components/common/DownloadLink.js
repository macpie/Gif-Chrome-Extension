import React, {
    PropTypes
} from 'react';
import IconButton from 'material-ui/IconButton';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';

class DownloadLink extends React.Component {
    render() {
        return (
            <IconButton
                style={{
                    verticalAlign: "baseline"
                }}
                iconStyle={{color: "rgb(0, 188, 212)"}}
                tooltipPosition="bottom-center"
                tooltip="Download"
                children={<DownloadIcon />}
                href={this.props.gif.url}
                download="test.gif"
            />
        );
    }
};

DownloadLink.propTypes = {
    gif: PropTypes.object.isRequired
};

export default DownloadLink;