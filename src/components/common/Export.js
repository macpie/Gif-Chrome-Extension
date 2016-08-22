import React from 'react';
import GifStore from '../../stores/GifStore';

class Export extends React.Component {
    constructor(props) {
        super(props);

        this.handleExport = this.handleExport.bind(this);
    }
    handleExport(e) {
        let dataString = 'data:text/json;charset=utf-8,';

        dataString += encodeURIComponent(JSON.stringify(GifStore.getAll(), null, 4));

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

export default Export;