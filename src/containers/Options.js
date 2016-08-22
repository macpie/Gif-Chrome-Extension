import React from 'react';
import * as GifActions from '../actions/GifActions';
import Import from '../components/common/Import';
import Export from '../components/common/Export';

class Options extends React.Component {
    constructor(props) {
        super(props);

        this.importSuccess = this.importSuccess.bind(this);
        this.importFailure = this.importFailure.bind(this);
    }
    importSuccess(data) {
        GifActions.importGifs(data);

        toastr.success('GIFs imported!'); //eslint-disable-line no-undef
    }
    importFailure() {
        toastr.warning('Make sure file is proper JSON', 'Failed to import'); //eslint-disable-line no-undef
    }
    render() {
        return (
            <div id="Options" className="col-xs-12">
                <div className="btn-group-vertical" role="group" aria-label="...">
                    <Import onSuccess={this.importSuccess} onFailure={this.importFailure}/>
                    <Export />
                </div>
            </div>
        );
    }
};

export default Options;