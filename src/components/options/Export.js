import React, {
    PropTypes
} from 'react';

class Export extends React.Component {
    constructor(props) {
        super(props);

        this.handleExport = this.handleExport.bind(this);
    }
    handleExport(e) {
        let dataString = 'data:text/json;charset=utf-8,';

        dataString += encodeURIComponent(JSON.stringify(this.props.gifs, null, 4));

        $(e.target).attr({
            href: dataString,
            download: 'gifs.json'
        });
    }
    render() {
        return (
            <a className="btn btn-primary" onClick={this.handleExport}>Download as JSON</a>
        );
    }
};

Export.propTypes = {
    gifs: PropTypes.object.isRequired
};

export default Export;