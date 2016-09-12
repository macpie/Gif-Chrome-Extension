import React from 'react';
import Import from './Import';
import Export from './Export';
import ResetPriority from './ResetPriority';

class Options extends React.Component {
    constructor(props) {
        super(props);

        this.importSuccess = this.importSuccess.bind(this);
        this.importFailure = this.importFailure.bind(this);
        this.resetPriorities = this.resetPriorities.bind(this);
    }
    importSuccess(data) {
        this.props.actions.import_data(data);

        toastr.success('GIFs imported!');
    }
    importFailure() {
        toastr.warning('Make sure file is proper JSON', 'Failed to import');
    }
    resetPriorities() {
        this.props.actions.reset_priority();

        toastr.success('Priorities reseted');
    }
    render() {
        return (
            <div id="Options" className="col-xs-12">
                <div className="btn-group-vertical" role="group" aria-label="...">
                    <Import onSuccess={this.importSuccess} onFailure={this.importFailure}/>
                    <Export gifs={this.props.gifs} />
                    <ResetPriority reset={this.resetPriorities}/>
                </div>
            </div>
        );
    }
};

export default Options;