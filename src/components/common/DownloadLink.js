import React, {
    PropTypes
} from 'react';

class DownloadLink extends React.Component {
    constructor(props) {
        super(props);

        this.handleDownload = this.handleDownload.bind(this);
    }
    handleDownload(e) {
        $(e.target).attr({
            href: this.props.url,
            download: 'test.gif'
        });
    }
    render() {
        return (
            <a onClick={this.handleDownload}>Download</a>
        );
    }
};

DownloadLink.propTypes = {
    url: PropTypes.string.isRequired
};

export default DownloadLink;