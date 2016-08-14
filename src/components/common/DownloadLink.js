import React, {
    PropTypes
} from 'react';

class DownloadLink extends React.Component {
    constructor(props) {
        super(props);

        this.handleDownload = this.handleDownload.bind(this);
    }
    handleDownload(e) {
        var $target = $(e.target);

        if($target.is('i')) {
            $target = $(e.target).parent();
        }

        $target.attr({
            href: this.props.url,
            download: 'test.gif'
        });
    }
    render() {
        return (
            <a className="btn btn-primary" onClick={this.handleDownload}>
                <i className="fa fa-cloud-download" aria-hidden="true"></i>
            </a>
        );
    }
};

DownloadLink.propTypes = {
    url: PropTypes.string.isRequired
};

export default DownloadLink;