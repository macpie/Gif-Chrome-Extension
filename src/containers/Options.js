import React from 'react';
import Export from '../components/common/Export';
import Import from '../components/common/Import';
import DownloadLink from '../components/common/DownloadLink';

class Options extends React.Component {
    constructor(props) {
        super(props);

        this.importSuccess = this.importSuccess.bind(this);
    }
    importSuccess(data) {
        console.log(data);
    }
    render() {
        return (
            <div className="row">
                <Export />
                <DownloadLink url="http://i.imgur.com/y5x7n4m.gif"/>
                <Import onSuccess={this.importSuccess} />
            </div>
        );
    }
};

export default Options;