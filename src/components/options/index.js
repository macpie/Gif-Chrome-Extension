import React from 'react';
import Divider from 'material-ui/Divider';
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
        this.props.goTo('/gifs');
    }
    importFailure() {
        toastr.warning('Make sure file is proper JSON', 'Failed to import');
    }
    resetPriorities() {
        this.props.actions.reset_priority();

        toastr.success('Priorities reseted');
        this.props.goTo('/gifs');
    }
    render() {
        return (
            <div id="Options" className="col-xs-6 col-xs-offset-3">
                <Import onSuccess={this.importSuccess} onFailure={this.importFailure} />
                <Divider />
                <Export gifs={this.props.gifs} />
                <Divider />
                <ResetPriority reset={this.resetPriorities} />
            </div>
        );
    }
};

export default Options;